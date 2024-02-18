const fs = require('fs').promises;
const path = require('path');

const dataFolderPath = path.join(__dirname, '../data');

// Fonction pour lire les données 
exports.readDataFromFile = async () => {
    try {
        const rawData = await fs.readFile(path.join(dataFolderPath, 'vaches.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading vaches.json:', error);
        throw error;
    }
};


// Fonction pour ajouter 
exports.addVache = async (newVacheData) => {
    try {
        const vaches = await readDataFromFile();

        const existingVache = vaches.find(vache => vache.id_vache === newVacheData.id_vache);
        if (existingVache) {
            throw new Error('Une vache avec cet ID existe déjà.');
        }

        const newVache = {
            id_vache: newVacheData.id_vache,
            date_entree: newVacheData.date_entree,
            race: newVacheData.race
        };

       
        vaches.push(newVache);

        // ecrire dans json
        await fs.writeFile(path.join(dataFolderPath, 'vaches.json'), JSON.stringify(vaches, null, 2));

        return newVache;
    } catch (error) {
        throw error;
    }
};

// Fonction pour lire les données des vaches depuis le fichier JSON
const readDataFromFile = async () => {
    try {
        const rawData = await fs.readFile(path.join(dataFolderPath, 'vaches.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading vaches.json:', error);
        throw error;
    }
};



// Fonction pour mettre à jour une vache existante
exports.updateVache = async (id, updatedVacheData) => {
    try {
        const vaches = await readDataFromFile();
        // find Id 
        const index = vaches.findIndex(vache => vache.id_vache === id);
        if (index === -1) {
            throw new Error('Vache not found');
        } 
        vaches[index].date_entree = updatedVacheData.date_entree;
        vaches[index].race = updatedVacheData.race;
        await fs.writeFile(path.join(dataFolderPath, 'vaches.json'), JSON.stringify(vaches, null, 2));
        return vaches[index];
    } catch (error) {
        throw error;
    }
};


// Fonction pour supprimer
exports.deleteVache = async (id) => {
    try {
       
        const vaches = await readDataFromFile();
        const updatedVaches = vaches.filter(vache => vache.id_vache !== id);
        await fs.writeFile(path.join(dataFolderPath, 'vaches.json'), JSON.stringify(updatedVaches, null, 2));
    } catch (error) {
        throw error;
    }
};

