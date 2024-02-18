const fs = require('fs').promises;
const path = require('path');

const dataFolderPath = path.join(__dirname, '../data');

// Fonction pour lire les données 
exports.readDataFromFile = async () => {
    try {
        const rawData = await fs.readFile(path.join(dataFolderPath, 'naissances.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading naissances.json:', error);
        throw error;
    }
};


//fonction pour ajouter
exports.addNaissance= async (newNaissanceData) => {
    try {
        const naissances = await readDataFromFile();
        
        // Vérifier si id_vache existe 
        const vachesData = await readVachesData();
        const vacheExists = vachesData.some(vache => vache.id_vache === newNaissanceData.id_vache);
        if (!vacheExists) {
            throw new Error('L\'ID de la vache spécifié n\'existe pas.');
        }

        //ajouter id auto increment 

        const maxIdNaiss = naissances.reduce((maxId, naissance) => {
            return naissance.id_naiss > maxId ? parseInt(naissance.id_naiss) : maxId;
        }, 0);

        const newIdNaiss = (maxIdNaiss+ 1).toString(); // Convertir en chaîne de caractères

        const newNaiss= {
            id_naiss: newIdNaiss,
            date_naissance: newNaissanceData.date_naissance,
            id_vache: newNaissanceData.id_vache,
          
        };

        naissances.push(newNaiss);
        await fs.writeFile(path.join(dataFolderPath, 'naissances.json'), JSON.stringify(naissances, null, 2));

        return newNaiss;
    } catch (error) {
        throw error;
    }
};

// Fonction pour lire les données 
const readDataFromFile = async () => {
    try {
        const rawData = await fs.readFile(path.join(dataFolderPath, 'naissances.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading:', error);
        throw error;
    }
};

// Fonction pour lire les données des vaches
const readVachesData = async () => {
    try {
        const rawData = await fs.readFile(path.join(dataFolderPath, 'vaches.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading vaches.json:', error);
        throw error;
    }
};


// Fonction update 
exports.updateNaissance = async (naissId, updatedNaissData) => {
    try {
        const naissances = await readDataFromFile();

        // Verifier si
        const naissIndex = naissances.findIndex(naissance => naissance.id_naiss=== naissId);
        if (naissIndex === -1) {
            throw new Error(' Naiss avec l\'ID spécifié n\'existe pas.');
        }

        // Verifier si vache existe
        const vachesData = await readVachesData();
        const vacheExists = vachesData.some(vache => vache.id_vache === updatedNaissData.id_vache);
        if (!vacheExists) {
            throw new Error('L\'ID de la vache spécifié n\'existe pas.');
        }

        // update
        naissances[naissIndex] = {
            ...naissances[naissIndex],
            date_naissance: updatedNaissData.date_naissance || naissances[naissIndex].date_naissance,
            id_vache: updatedNaissData.id_vache || naissances[naissIndex].id_vache,
          
        };

       
        await fs.writeFile(path.join(dataFolderPath, 'naissances.json'), JSON.stringify(naissances, null, 2));

        return naissances[naissIndex];
    } catch (error) {
        throw error;
    }
};

// Fonction pour supprimer
exports.deleteNaissance = async (id) => {
    try {
       
        const naissances = await readDataFromFile();
        const updatedNaissances= naissances.filter(naissance => naissance.id_naiss!== id);
        await fs.writeFile(path.join(dataFolderPath, 'naissances.json'), JSON.stringify(updatedNaissances, null, 2));
    } catch (error) {
     
        throw error;
        
    }
};