const mongoose = require('mongoose');

//structure for a preferences document
const preferencesSchema = new mongoose.Schema({
    sortMethod : {
        type: String,   
        default: 'default',
    },
    searchTerm: {
        type: String,   
        default: '',
    },
    //automatically add createdAt and updatedAt 
}, { timestamps: true });

module.exports = mongoose.model('Preferences', preferencesSchema);  