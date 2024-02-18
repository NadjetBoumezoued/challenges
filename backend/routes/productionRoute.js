const express = require('express');
const router = express.Router();
const productionController = require('../controllers/productionController');

// Route pour récupérer les données
router.get('/prod', productionController.getProduction);

// Route pour ajouter 
router.post('/prod', productionController.addProduction);

// Route pour mettre à jour
router.put('/prod/:id', productionController.updateProduction);

// Route pour supprimer
router.delete('/prod/:id', productionController.deleteProduction);

module.exports = router;
