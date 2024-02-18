const { readDataFromFile } = require('../services/vacheService');

// fonction pour afficher les vaches
exports.getVaches = async (req, res) => {
    try {
        const vaches = await readDataFromFile();
        res.json(vaches);
    } catch (error) {
        console.error('Error retrieving vaches:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const { addVache } = require('../services/vacheService');

// Fonction add
exports.addVache = async (req, res) => {
    try {
        const newVache = await addVache(req.body);
        res.status(201).json({ message: 'Vache ajoutée avec succès', newVache });
    } catch (error) {
        console.error('Error adding vache:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const { updateVache } = require('../services/vacheService');

// Fonction updaate
exports.updateVache = async (req, res) => {
    try {
        const updatedVache = await updateVache(req.params.id, req.body);
        res.json({ message: 'Vache mise à jour avec succès', updatedVache });
    } catch (error) {
        console.error('Error updating vache:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const { deleteVache } = require('../services/vacheService');

// Fonction supprimer
exports.deleteVache = async (req, res) => {
    try {
        await deleteVache(req.params.id);
        res.json({ message: 'Vache supprimée avec succès' });
    } catch (error) {
        console.error('Error deleting vache:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
