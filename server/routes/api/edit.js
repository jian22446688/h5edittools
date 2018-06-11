const express = require('express');
const fs = require('fs');
const path = require('path')
const router = express.Router();
const multer = require('multer')
const auth = require('../verify/index');
const uuidv1 = require('uuid/v1')
const imageSize = require('image-size')
const Theme = require('../../models/edit/theme')
const File = require('../../models/edit/file')
const template = require('art-template')
var zipper = require('zip-local');
/**
 * 获取一个页面的数据 需要验证
 * @parma { itemid }
 */
router.get('/pages/:itemid', function (req, res) {
    let uid = req.session.userinfo ? req.session.userinfo._id : undefined;
    let pa = {_id:req.params.itemid, userId: uid}
    Theme.findOne(uid ? pa : { _id:req.params.itemid }).then((data) =>{
        if(data){
            res.data.message = '获取一个页面数据成功'
            res.data.body = data
            res.json(res.data)
        }else {
            res.data.code = -1
            res.data.message = '获取数据失败，没有查找到数据'
            res.json(res.data)
        }
    }).catch((err)=>{
        res.data.code = -1
        res.data.message = '获取数据失败'
        res.json(res.data)
    })
})

/**
 * 需要验证 获取用户创建的 H5 需要验证
 * @parma {  }
 */
router.get('/pages', function (req, res) {
    console.log(req.query.userid)
    let uid = req.session.userinfo ? req.session.userinfo._id : undefined
    Theme.find({ userId: uid || req.query.userid }).sort({ 'update_item': -1 }).then(data =>{
        if (data) {
            res.data.message = '获取列表成功';
            res.data.body = data;
            res.json(res.data)
        }else {
            res.data.code = -1
            res.data.message = '获取数据失败';
            res.json(res.data)
        }
    })
})


/**
 * 获取发布的 H5 页面
 */
router.get('/page/build', function (req, res) {
    Theme.find({status: 1}).sort({'update_item': -1}).then(data =>{
        if (data) {
            res.data.message = '获取发布列表成功'
            res.data.body = data
            res.json(res.data)
        }else {
            res.data.code = -1
            res.data.message = '暂无发布数据'
            res.data.body = data
            res.json(res.data)
        }
    })
})

/**
 * 创建新的 H5 页面 需要验证
 * @parma { post h5 theme.modal data }
 */
router.post('/pages', auth.userLoginAuth, function (req, res) {
    if(req.session.userinfo){
        req.body.userId = req.session.userinfo._id
        Theme.create(req.body).then((data)=>{
            res.data.message = '保存成功';
            res.data.body =  data;
            res.json(res.data)
        })
    }else {
        res.code = 1; // 0 成功 -1 错误
        res.data.message = '保存错误';
        res.json(res.data)
    }
})

/**
 * 保存更改的H5页面 需要验证
 * @parma { itemid  h5 body: theme.modal data }
 */
router.put('/pages/:itemid', auth.userLoginAuth, function (req, res) {
    let id = req.params.itemid
    req.body.updated_time = new Date();
    Theme.findOneAndUpdate({ _id: id, userId: req.session.userinfo._id}, req.body,
        { setDefaultsOnInsert: true, runValidators: true })
        .then(data => {
            if(data){
                res.data.message = '更新成功'
                res.json(res.data)
            } else {
                res.code = -1
                res.data.message = '更新获取数据错误'
                res.json(res.data)
            }
        }).catch(err => {
            res.data.code = -1
            res.data.message = '保存更新错误'
            res.json(res.data)
        });
})

/**
 * 删除 H5页面 需要验证
 * @param { itemid }
 */
router.delete('/pages/:itemid', function (req, res) {
    if(req.params.itemid){
        let uid = req.session.userinfo ? req.session.userinfo._id : undefined;
        let pa = {_id:req.params.itemid, userId: uid}
        Theme.remove(uid ? pa : { _id:req.params.itemid }).then(data => {
            res.data.message = '删除成功'
            res.data.body = data
            res.json(res.data)
        }).catch(err => {
            res.data.code = -1
            res.data.message = '删除错误'
            res.json(res.data)
        })
    }else {
        res.data.code = -1
        res.data.message = '页面删除错误'
        res.json(res.data)
    }

})

/**
 * 预览查看 H5页面
 */
router.get('/preview/:themeid', function (req, res) {
    let id = req.params.themeid
    let par = {_id:id, status: 1}
    if(req.session.userinfo){
        par = {_id:id, userId: req.session.userinfo._id}
    }
    Theme.findOne(par).then((data) =>{
        if(data){
            data.preview = true
            res.render('demo/index.art', data)
        }else {
            res.status(404);
            res.data.code = -1
            res.data.message = '获取数据失败，没有查找到数据'
            res.json(res.data)
        }
    })
})

/**
 * 用户使用模板 添加模板使用数量
 */
router.get('/usetheme/:themeid', auth.userLoginAuth, function (req, res) {
    let id = req.params.themeid
    Theme.findOne({ _id: id, userId: req.session.userinfo._id}).then(data => {
        if(data){
            Theme.update({_id: id}, {use_count: data.use_count + 1}).then((doc) => {
                if(doc){
                    res.data.message = '更新成功'
                    res.json(res.data)
                }else {
                    res.data.code = -1
                    res.data.message = '更新失败'
                    res.json(res.data)
                }
            })
        }else {
            res.data.code = -1
            res.data.message = '更新失败'
            res.json(res.data)
        }
    })
})


router.get('/thdownload/:themeid', auth.userLoginAuth, function (req, res) {
    let id = req.params.themeid
    let par = {}
    if(req.session.userinfo){
        par = {_id:id, userId: req.session.userinfo._id}
    }
    Theme.findOne(par).then((data) =>{
        if(data){
            let updir = process.cwd() + '/server/public/'
            let imgList = new Set([])
            data.pages.map(item => {
                if(item.bg.img){
                    imgList.add(item.bg.img)
                    let is = item.bg.img.split('/')
                    item.bg.img ='image/' + is[is.length-1]
                }
                item.elements.map(src => {
                    if(src.imgSrc) {
                        imgList.add(src.imgSrc)
                        let is = src.imgSrc.split('/')
                        src.imgSrc = 'image/' + is[is.length-1]
                    }
                })
            })
            let svaedir = process.cwd() + '/upTmpe/'
            let html = template( process.cwd() + '/server/views/demo/index.art', data)
            let spath =  svaedir + data.title + '_' + new Date().getTime()
            let htmlname = svaedir + 'demo/index.html'
            //同步方法
            try {
                fs.writeFileSync(htmlname, html)
            }catch (e) {
                res.data.code = -1
                res.data.message = '文件写入失败'
                res.json(res.data)
            }
            let cpimg = svaedir + '/demo/image/'
            createFolder(cpimg)
            for (let item of imgList.keys()) {
                console.log(item);
                let imgn = item.split('/')
                copyfile(updir + item, cpimg + imgn[imgn.length - 1])
            }
            zipper.zip(svaedir + 'demo', function(error, zipped) {
                if(!error) {
                    // or save the zipped file to disk
                    let zipfile = spath + ".zip"
                    zipped.save(zipfile, function(error) {
                        if(!error) {
                            try {
                                rmdir(cpimg);
                            } catch (e) {
                                console.log(e.message);
                            }
                            res.download(zipfile)
                        }
                    });
                }
            });
        }else {
            res.data.code = -1
            res.data.message = '获取数据失败，没有查找到数据'
            res.json(res.data)
        }
    })
})


/********************************************************************************************************************/
/********************************************************************************************************************/
/********************************************************************************************************************/
// 文件操作

//上传文件目录
let uploadPath = './server/public/upload/'
// 创建 multer 对象
var uploadStorage = multer({ dest: './upTmpe' });
let uploadType = uploadStorage.single('uploadFile');
let uplaodArray = uploadStorage.array('uploadFile', 10)
/**
 * 创建文件夹
 * @param folder
 */
var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

/**
 * 复制文件
 * @param src
 * @param dir
 */
function copyfile(src, dir) {
    fs.writeFileSync(dir, fs.readFileSync(src));
}

var rmdir = function (dirPath) {
    var files = fs.readdirSync(dirPath);
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = path.join(dirPath, files[i]);
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            } else {
                rmdir(filePath);
            }
        }
    fs.rmdirSync(dirPath);
};

/*
05
 * 复制目录中的所有文件包括子目录
06
 * @param{ String } 需要复制的目录
07
 * @param{ String } 复制到指定的目录
08
 */
var copy = function( src, dst ){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }

        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;

            fs.stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }

                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};

/**
 * 单个文件上传文件
 * @param { params.userid, params.themeid  }
 */
router.post('/files/upload/:userid/:themeid', function (req, res) {
    if(req.params.userid.toString().length === 24){
        uploadType(req, res, function (err) {
            //处错误直接返回
            if(err){
                res.code = -1
                res.data.message = '上传文件出错'
                res.json(res.data)
                return
            }
            if(req.file) {
                console.log('upload: '+req.file.originalname);
                // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
                // 对临时文件转存，fs.rename(oldPath, newPath,callback);
                let userpath = req.params.userid  + '/'
                let filename = 'img_' + uuidv1().replace(/-/g, '');
                let newName = filename + path.extname(req.file.originalname)
                createFolder(uploadPath + userpath)
                fs.rename(req.file.path, uploadPath + userpath + newName, function(err) {
                    if (err) {
                        res.code = -1
                        res.data.message = '转存文件出错'
                        res.json(res.data)
                    }else {
                        let imgSize = imageSize(uploadPath + userpath + newName);
                        let obj = {
                            userId: req.params.userid || 'all',
                            themeId: req.params.themeid || 'all',
                            name: path.basename(req.file.originalname),
                            fileName: newName,
                            width: imgSize.width,
                            height: imgSize.height,
                            type: imgSize.type,
                            fileSize: req.file.size,
                            fileUrl: 'upload/' + userpath + newName,
                        }
                        //保存图片数据 到数据库
                        File.create(obj).then(data => {
                            res.data.message = '图片上传成功'
                            res.data.body = data
                            res.json(res.data)
                        })
                    }
                })
            }else {
                res.code = -1
                res.data.message = '文件不能为空'
                res.json(res.data)
            }
        })
    } else {
        res.code = -1
        res.data.message = '用户ID不正确'
        res.json(res.data)
    }
})

/**
 * 多个文件上传文件
 * @param { params.userid, params.themeid  }
 */
router.post('/files/uploads', function (req, res) {
    uplaodArray(req, res, function (err) {
        //处错误直接返回
        if(err){
            res.code = -1
            res.data.message = '上传文件出错'
            res.json(res.data)
            return
        }
        if(req.files){
            let files = req.files
            // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
            // 对临时文件转存，fs.rename(oldPath, newPath,callback);
            let userpath = (req.query.userid || 'all')  + '/'
            createFolder(uploadPath + userpath)
            let uf = []
            for (let i = 0; i < files.length; i++) {
                let filename = 'img_' + uuidv1().replace(/-/g, '');
                let newName = filename + path.extname(files[i].originalname)
                fs.rename(files[i].path, uploadPath + userpath + newName, function(err) {
                    if (err) {
                        res.code = -1
                        res.data.message = '转存文件出错'
                        res.json(res.data)
                    }else {
                        let imgSize = imageSize(uploadPath + userpath + newName);
                        let obj = {
                            userId: req.query.userid || 'all',
                            themeId: req.query.themeid || 'all',
                            name: path.basename(files[i].originalname),
                            fileName: newName,
                            width: imgSize.width,
                            height: imgSize.height,
                            type: imgSize.type,
                            fileSize: files[i].size,
                            fileUrl: 'upload/' + userpath + newName,
                        }
                        //保存图片数据 到数据库
                        File.create(obj).then(() => { })
                    }
                })
                let ufo = {
                    name: path.basename(files[i].originalname),
                    url: 'upload/' + userpath + newName,
                }
                uf.push(ufo)
            }
            res.data.message = '上传文件成功'
            res.data.body = uf
            res.json(res.data)
        }else {
            res.code = -1
            res.data.message = '文件不能为空'
            res.json(res.data)
        }
    })
})

/**
 * 获取公开的图片文件
 */
router.get('/files/uploads', function (req, res) {
    let pageSize = Number(req.query.pageSize || 20)
    let pageIndex = Number(req.query.pageIndex || 1) - 1
    File.count({userId: 'all', 'status': 1}).then((data) => {
        if(data){
            File.find({userId: 'all', 'status': 1})
                .limit(pageSize).skip(pageIndex * pageSize)
                .sort({'created_time': -1}).then((redata) => {
                res.data.message = '获取数据成功'
                res.data.body = {count: data, data: redata, index: pageIndex + 1 }
                res.json(res.data)
            })
        }else {
            res.data.code = -1
            res.data.message = '获取数据失败'
            res.json(res.data)
        }
    })
})

/**
 * 获取用户制作H5页面上传的图片文件
 * @param { ?userid=xxxxx && themeid=xxxx }
 */
router.get('/files/user/img', function (req, res) {
    if(req.query.userid || req.query.themeid){
        let pageSize = Number(req.query.pageSize || 20)
        let pageIndex = Number(req.query.pageIndex || 1) - 1
        if(req.query.userid){
            File.count({userId: req.query.userid, 'status': 1}).then((data) => {
                if(data){
                    File.find({userId: req.query.userid, 'status': 1})
                        .limit(pageSize).skip(pageIndex * pageSize)
                        .sort({'created_time': -1}).then((redata) => {
                        res.data.message = '获取数据成功'
                        res.data.body = {count: data, data: redata, index: pageIndex + 1 }
                        res.json(res.data)
                    })
                } else {
                    res.data.code = -1
                    res.data.message = '获取数据失败'
                    res.json(res.data)
                }
            })
        }else {
            File.count({themeId: req.query.themeid, 'status': 1}).then((data) => {
                if(data){
                    File.find({themeId: req.query.themeid, 'status': 1})
                        .limit(pageSize).skip(pageIndex * pageSize)
                        .sort({'created_time': -1}).then((redata) => {
                        res.data.message = '获取数据成功'
                        res.data.body = {count: data, data: redata, index: pageIndex + 1 }
                        res.json(res.data)
                    })
                } else {
                    res.data.code = -1
                    res.data.message = '获取数据失败'
                    res.json(res.data)
                }
            })
        }
    }else {
        res.data.code = -1
        res.data.message = '用户id不能为空'
        res.data.body = data
        res.json(res.data)
    }
})

/**
 * 获取图片数量
 */
router.get('/files/user/img/count', function(req, res){
    if(req.query.userid || req.query.themeid){
        if(req.query.userid){
            File.count({userId: req.query.userid, 'status': 1}).then((data) => {
                res.data.message = '获取数据成功'
                res.data.body = { count: data }
                res.json(res.data)
            })
        }else {
            File.count({themeId: req.query.themeid, 'status': 1}).then((data) => {
                res.data.message = '获取数据成功'
                res.data.body = { count: data }
                res.json(res.data)
            })
        }
    }else {
        res.data.code = -1
        res.data.message = '用户id不能为空'
        res.data.body = data
        res.json(res.data)
    }
})

/**
 * 删除文件
 * @param { params.fileid }
 */
router.delete('/files/upload/:fileid', function (req, res) {
    if(req.params.fileid){
        let uid = req.session.userinfo ? req.session.userinfo._id : undefined;
        let pa = {_id:req.params.fileid, userId: uid}
        let par = uid ? pa : { _id: req.params.fileid }
        console.log(par)
        File.findOneAndUpdate(par , { status: 0 }).then((data) => {
            if (data) {
                res.data.message = '删除成功'
                res.data.body = data
                res.json(res.data)
            }else {
                res.data.message = '删除失败，数据不正确'
                res.data.body = data
                res.json(res.data)
            }
        })
    }else {
        res.code = -1
        res.data.message = '文件ID不能为空'
        res.json(res.data)
    }
})

router.get('/file/:id', function (req, res) {

    File.findOne({ _id: req.params.id }).then(data => {
        res.data.message = '获取文件成功'
        res.data.body = data
        res.json(res.data)
    })
})

module.exports = router
