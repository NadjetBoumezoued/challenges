const { readDataFromFile } = require('../services/productionService');

// fonction pour afficher les productions 
exports.getProduction= async (req, res) => {
    try {
        const productions = await readDataFromFile();
        res.json(productions);
    } catch (error) {
        console.error('Error retrieving productions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const {addProduction} = require('../services/productionService');

// Fonction add
exports.addProduction= async (req, res) => {
    try {
        const newProduction= await addProduction(req.body);
        res.status(201).json({ message: 'Production ajoutée avec succès',newProduction });
    } catch (error) {
        console.error('Error adding exam:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const { updateProduction} = require('../services/productionService');

// Fonction updaate
exports.updateProduction = async (req, res) => {
    try {
        const updatedProduction= await updateProduction(req.params.id, req.body);
        res.json({ message: 'mise à jour avec succès', updatedProduction });
    } catch (error) {
        console.error('Error updating', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const { deleteProduction } = require('../services/productionService');

// Fonction supprimer
exports.deleteProduction = async (req, res) => {
    try {
        await deleteProduction(req.params.id);
        res.json({ message: 'supprimée avec succès' });
    } catch (error) {
        console.error('Error deleting ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
