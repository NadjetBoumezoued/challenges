import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import axios from 'axios';
import '../vache/ajouter.css'

const AddVacheForm = () => {
    const [examData, setExamData] = useState({
        date_exam: '',
        id_vache: '', 
        maladie: '' 
    });
    const [message, setMessage] = useState(null); // Etat pour gérer le message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamData({
            ...examData,
            [name]: value
        });
    };

   
    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setExamData({
            ...examData,
            date_exam: formattedDate
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/exams', examData);
            console.log(response.data); 
            setMessage('Examen ajoutée avec succès !'); // Message de succès
            setExamData({
                date_examen: '',
                id_vache: '', 
                maladie: '' 
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'examen ', error);
            setMessage('Le numéro  de la vache spécifié n\'existe pas'); // Message d'erreur
        }
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Ajouter un examen médicale</h2>
                <DatePicker
                    selected={examData.date_exam}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd" 
                    placeholderText="Date d'examen "
         
                />
                <input type="text" name="id_vache" value={examData.id_vache} onChange={handleChange} placeholder="ID de la vache" required/>
                <input type="text" name="maladie" value={examData.maladie} onChange={handleChange} placeholder="Maladie"/>
               
               
                <br/><br/> 
                <button className="submit-add" type="submit"><b>Ajouter un examen médicale</b></button>
                <br/>
            </form>
            {message && (
                <div className={message.includes('Erreur') ? 'error-message' : 'success-message'} style={{ textAlign: 'center' }}>
                    {message}
                </div>
            )}
 </div>
    );
};

export default AddVacheForm;
