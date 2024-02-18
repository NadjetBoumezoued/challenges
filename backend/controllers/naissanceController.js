const { readDataFromFile } = require('../services/naissanceService');

// fonction pour afficher les naissances 
exports.getNaissance= async (req, res) => {
    try {
        const naissances = await readDataFromFile();
        res.json(naissances);
    } catch (error) {
        console.error('Error retrieving naissances:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const {addNaissance} = require('../services/naissanceService');

// Fonction add
exports.addNaissance= async (req, res) => {
    try {
        const newNaissance= await addNaissance(req.body);
        res.status(201).json({ message: 'Naissance ajoutée avec succès',newNaissance });
    } catch (error) {
        console.error('Error adding exam:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const { updateNaissance} = require('../services/naissanceService');

// Fonction updaate
exports.updateNaissance = async (req, res) => {
    try {
        const updatedNaissance= await updateNaissance(req.params.id, req.body);
        res.json({ message: 'mise à jour avec succès', updatedNaissance });
    } catch (error) {
        console.error('Error updating', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const { deleteNaissance } = require('../services/naissanceService');

// Fonction supprimer
exports.deleteNaissance = async (req, res) => {
    try {
        await deleteNaissance(req.params.id);
        res.json({ message: 'supprimée avec succès' });
    } catch (error) {
        console.error('Error deleting ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
