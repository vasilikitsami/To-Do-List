import Results from '../models/results';

const saveResults = async (req, res) => {
    const { sortMethod, searchTerm, results } = req.body;

    try {
        const savedResults = await Results.create({ sortMethod, searchTerm, results });
        res.status(201).json(savedResults);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save results' });
    }

}

const getResults = async (req, res) => {
        const all = await Results.find().sort({ createdAt: -1 });
        res.json(all);
    };

export {
    saveResults,
    getResults
};
