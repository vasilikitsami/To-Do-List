import mongoose from 'mongoose';

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

export default mongoose.model('Preferences', preferencesSchema);  