const fs = require('fs').promises;
const path = require('path');

const dataFolderPath = path.join(__dirname, '../data');

// Fonction pour lire les données 
exports.readDataFromFile = async () => {
    try {
        const rawData = await fs.readFile(path.join(dataFolderPath, 'production.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading production.json:', error);
        throw error;
    }
};


//fonction pour ajouter
exports.addProduction= async (newProductionData) => {
    try {
        const productions = await readDataFromFile();
       
        //ajouter id auto increment 

        const maxIdProd = productions.reduce((maxId, production) => {
            return production.id_prod > maxId ? parseInt(production.id_prod) : maxId;
        }, 0);

        const newIdProd = (maxIdProd+ 1).toString(); // Convertir en chaîne de caractères
        const existingProd = productions.find(production => production.date_production === newProductionData.date_production);
        if (existingProd) {
            throw new Error('Vous avez déjà saisi la production pour ce jour.');
        }

        const newProd= {
            id_prod: newIdProd,
            date_production: newProductionData.date_production,
           qte: newProductionData.qte,
          
        };

        productions.push(newProd);
        await fs.writeFile(path.join(dataFolderPath, 'production.json'), JSON.stringify(productions, null, 2));

        return newProd;
    } catch (error) {
        throw error;
    }
};

// Fonction pour lire les données 
const readDataFromFile = async () => {
    try {
        const rawData = await fs.readFile(path.join(dataFolderPath, 'production.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading:', error);
        throw error;
    }
};

// Fonction update 
exports.updateProduction = async (prodId, updatedProdData) => {
    try {
        const productions = await readDataFromFile();

        // Verifier si
        const prodIndex = productions.findIndex(production => production.id_prod=== prodId);
        if (prodIndex === -1) {
            throw new Error(' Prod avec l\'ID spécifié n\'existe pas.');
        }

      
        // update
        productions[prodIndex] = {
            ...productions[prodIndex],
            date_production: updatedProdData.date_production || productions[prodIndex].date_production,
            qte: updatedProdData.qte || productions[prodIndex].qte,
          
        };

       
        await fs.writeFile(path.join(dataFolderPath, 'production.json'), JSON.stringify(productions, null, 2));

        return productions[prodIndex];
    } catch (error) {
        throw error;
    }
};

// Fonction pour supprimer
exports.deleteProduction = async (id) => {
    try {
       
        const productions = await readDataFromFile();
        const updatedProductions= productions.filter(production => production.id_prod!== id);
        await fs.writeFile(path.join(dataFolderPath, 'production.json'), JSON.stringify(updatedProductions, null, 2));
    } catch (error) {
     
        throw error;
        
    }
};