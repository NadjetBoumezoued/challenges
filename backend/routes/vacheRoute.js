const express = require('express');
const router = express.Router();
const vachesController = require('../controllers/vacheController');

// Route pour afficher
router.get('/vaches', vachesController.getVaches);

// Route pour ajouter une nv vache
router.post('/vaches', vachesController.addVache);

// Route update
router.put('/vaches/:id', vachesController.updateVache);

// Route pour supprimer
router.delete('/vaches/:id', vachesController.deleteVache);

module.exports = router;
