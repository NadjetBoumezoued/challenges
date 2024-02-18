const express = require('express');
const router = express.Router();
const naissanceController = require('../controllers/naissanceController');

// Route pour récupérer les données
router.get('/naiss', naissanceController.getNaissance);

// Route pour ajouter
router.post('/naiss', naissanceController.addNaissance);

// Route pour mettre à jour 
router.put('/naiss/:id', naissanceController.updateNaissance);

// Route pour supprimer
router.delete('/naiss/:id', naissanceController.deleteNaissance);

module.exports = router;
