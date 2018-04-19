var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var editRouter = require('./api/edit/edit')
router.use(function (req, res, next) {
    res.data = {
        code: 0,
        message: '请求成功',
        body: null
    }
    next();
});
router.use('/api/users', usersRouter);
router.use('/api/edit', editRouter);
module.exports = router;
