const { readDataFromFile } = require('../services/examService');

// fonction pour afficher les examens
exports.getExam = async (req, res) => {
    try {
        const examens = await readDataFromFile();
        res.json(examens);
    } catch (error) {
        console.error('Error retrieving examens:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const { addExam} = require('../services/examService');

// Fonction add
exports.addExam= async (req, res) => {
    try {
        const newExam= await addExam(req.body);
        res.status(201).json({ message: 'Exam ajoutée avec succès', newExam });
    } catch (error) {
        console.error('Error adding exam:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const { updateExam} = require('../services/examService');

// Fonction updaate
exports.updateExam = async (req, res) => {
    try {
        const updatedExam = await updateExam(req.params.id, req.body);
        res.json({ message: 'mise à jour avec succès', updatedExam });
    } catch (error) {
        console.error('Error updating', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const { deleteExam } = require('../services/examService');

// Fonction supprimer
exports.deleteExam = async (req, res) => {
    try {
        await deleteExam(req.params.id);
        res.json({ message: 'supprimée avec succès' });
    } catch (error) {
        console.error('Error deleting ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
