const fs = require('fs').promises;
const path = require('path');

const dataFolderPath = path.join(__dirname, '../data');

// Fonction pour lire les données 
exports.readDataFromFile = async () => {
    try {
        const rawData = await fs.readFile(path.join(dataFolderPath, 'examen_medicale.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading examen_medicale.json:', error);
        throw error;
    }
};


//fonction pour ajouter
exports.addExam = async (newExamData) => {
    try {
        const examens = await readDataFromFile();
        
        // Vérifier si id_vache existe 
        const vachesData = await readVachesData();
        const vacheExists = vachesData.some(vache => vache.id_vache === newExamData.id_vache);
        if (!vacheExists) {
            throw new Error('L\'ID de la vache spécifié n\'existe pas.');
        }

        //ajouter id_exam auto increment 

        const maxIdExam = examens.reduce((maxId, examen) => {
            return examen.id_exam > maxId ? parseInt(examen.id_exam) : maxId;
        }, 0);

        const newIdExam = (maxIdExam + 1).toString(); // Convertir en chaîne de caractères

        const newExam = {
            id_exam: newIdExam,
            date_exam: newExamData.date_exam,
            id_vache: newExamData.id_vache,
            maladie: newExamData.maladie
        };

        examens.push(newExam);
        await fs.writeFile(path.join(dataFolderPath, 'examen_medicale.json'), JSON.stringify(examens, null, 2));

        return newExam;
    } catch (error) {
        throw error;
    }
};

// Fonction pour lire les données des examens médicaux
const readDataFromFile = async () => {
    try {
        const rawData = await fs.readFile(path.join(dataFolderPath, 'examen_medicale.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading examen_medicale.json:', error);
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


// Fonction update exam
exports.updateExam = async (examId, updatedExamData) => {
    try {
        const examens = await readDataFromFile();

        // Verifier si examen existe
        const examIndex = examens.findIndex(exam => exam.id_exam === examId);
        if (examIndex === -1) {
            throw new Error('L\'examen avec l\'ID spécifié n\'existe pas.');
        }

        // Verifier si vache existe
        const vachesData = await readVachesData();
        const vacheExists = vachesData.some(vache => vache.id_vache === updatedExamData.id_vache);
        if (!vacheExists) {
            throw new Error('L\'ID de la vache spécifié n\'existe pas.');
        }

        // update
        examens[examIndex] = {
            ...examens[examIndex],
            date_exam: updatedExamData.date_exam || examens[examIndex].date_exam,
            id_vache: updatedExamData.id_vache || examens[examIndex].id_vache,
            maladie: updatedExamData.maladie || examens[examIndex].maladie
        };

       
        await fs.writeFile(path.join(dataFolderPath, 'examen_medicale.json'), JSON.stringify(examens, null, 2));

        return examens[examIndex];
    } catch (error) {
        throw error;
    }
};
// Fonction pour supprimer
// Fonction pour supprimer
exports.deleteExam = async (id) => {
    try {
       
        const exams = await readDataFromFile();
        const updatedExams = exams.filter(exam => exam.id_exam !== id);
        await fs.writeFile(path.join(dataFolderPath, 'examen_medicale.json'), JSON.stringify(updatedExams, null, 2));
    } catch (error) {
     
        throw error;
        
    }
};