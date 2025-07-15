const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
    sortMethod : {
        type: String,   
        default: 'default',
    },
    searchTerm: {
        type: String,   
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('Preferences', preferencesSchema);  