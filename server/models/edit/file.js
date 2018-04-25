var mongoose = require('mongoose');
var fileSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    themeId: {
        type: String,
    },
    name: String,
    fileName: String,

    fileUrl: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    },
    md5: {
        type: String,
        default: ''
    },
    type: String,
    fileSize: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1,  //  1 为正常图片  0 为已删除图片
    },
    created_time: {
        type: Date,
        default: new Date(),
    },
})
module.exports = mongoose.model('File', fileSchema);
