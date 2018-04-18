var express = require('express')
var router = express.Router()

router.get('/element', function (req, res, next) {

    res.send(res.data);
})


module.exports = router
