const Preferences = require('../models/Preferences');

const getPreferences = async (req, res) => {

    const preferences = await Preferences.findOne();
        if (!preferences) {
            const newPreferences = await Preferences.findOne();
            return res.json(newPreferences);
        }
        res.json(preferences);
    } 

const updatePreferences = async (req, res) => {
    const { sortMethod, searchTerm } = req.body;
    const preferences = await Preferences.findOne();
    if (preferences) {
        preferences.sortMethod = sortMethod;
        preferences.searchTerm = searchTerm;
        await preferences.save();
        return res.json(preferences);
    }else {
        const newPreferences = new Preferences({ sortMethod, searchTerm });
        return res.json(newPreferences);
    }
};
module.exports = {
    getPreferences,
    updatePreferences
};