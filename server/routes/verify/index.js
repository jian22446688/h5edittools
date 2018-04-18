/**
 * *权限验证
 * 用户是否登录
 */
module.exports.userLoginAuth = function (req, res, next) {
    if(!req.session.userinfo){
        res.data.message = "用户验证信息失败，请重新登录",
        res.json(res.data)
    }else {
        next();
    }
}
