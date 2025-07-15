const Preferences = require('../models/Preferences');

const getPreferences = async (req, res) => {

    // Fetch an existing preference from the database
    const preferences = await Preferences.findOne();
        //if nothing exists, return the default preferences
        if (!preferences) {
            const newPreferences = await Preferences.findOne();
            return res.json(newPreferences);
        }
        res.json(preferences);
    } 

const updatePreferences = async (req, res) => {
    const { sortMethod, searchTerm } = req.body;
    const preferences = await Preferences.findOne();
    // If preferences exist, update them; otherwise, create new preference from the values sent from frontend
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