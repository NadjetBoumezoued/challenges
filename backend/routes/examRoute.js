const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Route pour récupérer les données des vaches
router.get('/exams', examController.getExam);

// Route pour ajouter une nv vache
router.post('/exams', examController.addExam);

// Route pour mettre à jour une vache existante
router.put('/exams/:id', examController.updateExam);

// Route pour supprimer
router.delete('/exams/:id', examController.deleteExam);

module.exports = router;
