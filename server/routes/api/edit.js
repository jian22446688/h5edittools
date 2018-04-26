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

/**
 * 获取一个页面的数据 需要验证
 * @parma { itemid }
 */
router.get('/pages/:itemid', function (req, res) {
    Theme.findOne({_id:req.params.itemid}).then((data) =>{
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
 * 需要验证 获取用户创建的 H5
 * @parma {  }
 */
router.get('/pages', function (req, res) {
    console.log(req.query.userid)
    if(req.query.userid){
        Theme.find({userId: req.query.userid}).sort({'update_item': -1}).then(data =>{
            res.data.message = '获取列表成功';
            res.data.body = data;
            res.json(res.data)
        })
    }else {
        Theme.find({status: 1}).sort({'update_item': -1}).then(data =>{
            res.data.message = '获取发布列表成功';
            res.data.body = data;
            res.json(res.data)
        })
    }
})

/**
 * 创建新的 H5 页面
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
 * 保存更改的H5页面
 * @parma { itemid  h5 body: theme.modal data }
 */
router.put('/pages/:itemid',auth.userLoginAuth, function (req, res) {
    let id = req.params.itemid
    req.body.updated_time = new Date();
    Theme.findOneAndUpdate({ _id: id}, req.body, { setDefaultsOnInsert: true, runValidators: true } )
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
 * 删除 H5页面
 * @param { itemid }
 */
router.delete('/pages/:itemid', function (req, res) {
    if(req.params.itemid){
        Theme.remove({ _id: req.params.itemid}).then(data => {
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
        res.data.message = '页面ID不能为空'
        res.json(res.data)
    }

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
        File.findOneAndUpdate({ _id: req.params.fileid }, { status: 0 }).then(() => {
            res.data.message = '删除成功'
            res.json(res.data)
        })
    }else {
        res.code = -1
        res.data.message = '文件ID不能为空'
        res.json(res.data)
    }
})

module.exports = router
