var mongoose = require('mongoose');
var themeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'user'
    },
    title: String,
    description: String,
    pages: {
       type: Array,
       required: true,
    },

    html: String,

    type: {
        type: String,
        required: true,
        default: 'h5',
    },

    status: {
        type: Number,
        default: 0,
    },   // || '1' // 0 为保存 1 为发布
    themebg: {
        type: String,
        default: 'upload/all/img_default.png'
    },
    canvasHeight: Number,
    created_time: {
        type: Date,
        default: new Date(),
    },

    updated_time: {
        type: Date,
        default: new Date(),
    },

    build_time: {
        type: Date,
        default: new Date(),
    }
})
var Theme = mongoose.model('Theme', themeSchema);
module.exports = Theme;
