var express = require('express');
var ccap = require('ccap');
var auth = require('./verify/index');
var router = express.Router();
var User = require('../models/user/user')

/**
 * 获取用户信息 用于验证用户是否登录
 */
router.get('/userinfo',  function (req, res) {
    if(req.session.userinfo){
        res.data.message = '获取用户信息成功'
        res.data.body = req.session.userinfo
        res.json(res.data)
    }else {
        res.data.code = 40001
        res.data.message = '获取用户信息失败'
        res.json(res.data)
    }
})

/**
 * 测试  用于设置一个用户数据到 session中
 */
router.get('/usertest', function (req, res) {
    User.findOne({name: 'aaa'}).then((err)=>{
        console.log(err)
        if(err){
            req.session.userinfo = err
            res.data.message = '设置用户信息成功'
            res.data.body = err
            res.json(res.data)
        }
    })
})

/**
 * 测试 用于需要验证 用户登录的路由
 */
router.get('/userauth', auth.userLoginAuth, (req, res) => {
    res.data.message = "验证通过，可以往下操作"
    res.json(res.data)
})



/**
 * 用户注册
 * @param { name:'', password: '',email: '', vercode: ''}
 */
router.post('/register', function (req, res) {
    if(req.body.name == "" || req.body.password == "" || req.body.email == ""){
        res.data.code = -1;
        res.data.message = '用户名密码或邮箱不能为空'
        res.json(res.data);
        return
    }
    if(!(req.session.varcode && req.session.varcode == req.body.vercode)){
        res.data.code = -1;
        res.data.message = '验证密错误';
        res.json(res.data);
    } else {
        var user = new User();
        user.name = req.body.name
        user.password = req.body.password
        user.email = req.body.email
        User.findOne({ name: req.body.name }).then((err) =>{
            if(!err){
                User.findOne({ email: req.body.email }).then((err)=>{
                    if(!err){
                        user.save((err, save) =>{
                            req.session.varcode = undefined;
                            if(!err){
                                res.data.message = '用户注册成功'
                                res.data.body = save
                                res.json(res.data)
                                return
                            }
                        })
                    }else {
                        res.data.code = -1
                        res.data.message = '邮箱已存在请更换'
                        res.json(res.data)
                    }
                })
            }else {
                res.data.code = -1
                res.data.message = '用户名存在请更换'
                res.json(res.data)
            }
        })
    }
})

/**
 * 用户登录
 * @param { name:'', password: '', vercode: ''}
 */
router.post('/login', function (req, res) {
    if(req.body.name == "" || req.body.password == ""){
        res.data.code = -1;
        res.data.message = '用户名密码或邮箱不能为空'
        res.json(res.data);
        return
    }
    if(!(req.session.varcode && req.session.varcode == req.body.vercode)){
        res.data.code = -1;
        res.data.message = '验证密错误';
        res.json(res.data);
    } else {
        User.findOne({ name: req.body.name }).then((err) =>{
            if(err){
                console.log(err);
                if(req.body.name == err.name && req.body.password == err.password){
                    req.session.userinfo = err
                    res.data.message = "登录成功"
                    res.data.body = err;
                    console.log(" 欢迎：" +  err.name + ' 登录成功')
                }else {
                    res.data.code = -1
                    res.data.message = "用户名密码错误"
                }
                res.json(res.data);
            }else {
                res.data.code = -1
                res.data.message = '用户名不存在'
                res.json(res.data)
            }
        })
    }
})

/**
 * 退出登录
 */
router.get('/logout', function (req, res) {
    req.session.userinfo = undefined;
    res.data.message = '退出登录成功'
    res.json(res.data)
})

/**
 * 全局获取验证码
 */
router.get('/verifica', function (req, res, next) {
    var captcha = ccap({ width:122, height:36, offset:28, quality:100, fontsize:28,
        generate:function(){
            var num = ''
            for (var i =0; i<4; i++){ num += Math.floor(Math.random()* (10-1))+ 1; }
            return num;//return the captcha text
        }
    });
    var ary = captcha.get();
    var txt = ary[0];
    var buf = ary[1];
    req.session.varcode = txt;
    res.data.body = 'data:image/jpg;base64,' + new Buffer(buf).toString('base64');
    console.log('验证码：' + txt)
    res.json(res.data);
})

/**
 * 测试 验证码
 */
router.get('/verifica/:code', function (req, res, next) {
    if(req.session.varcode && req.session.varcode == req.param('code')){
        req.session.varcode = undefined;
        res.json(res.data);
    }else {
        res.data.code = -1;
        res.data.message = '验证密错误';
        res.json(res.data);
    }
});

module.exports = router;
