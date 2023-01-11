const mongoose = require('mongoose');
const shortId = require('shortId');

const urlCurtaSchema = new mongoose.Schema({
    completa: {
        type: String,
        required: true
    },
    curta: {
        type: String,
        required: true,
        default: shortId.generate
    },
    cliques: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('UrlCurta', urlCurtaSchema);