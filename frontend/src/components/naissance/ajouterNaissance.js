import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import axios from 'axios';
import '../vache/ajouter.css'

const AddVacheForm = () => {
    const [naissanceData, setNaissanceData] = useState({
        date_naissance: '',
        id_vache: ''
    });
    const [message, setMessage] = useState(null); // Etat pour gérer le message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNaissanceData({
            ...naissanceData,
            [name]: value
        });
    };

   
    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setNaissanceData({
            ...naissanceData,
            date_naissance: formattedDate
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/naiss', naissanceData);
            console.log(response.data); 
            setMessage('Naissance ajoutée avec succès !'); // Message de succès
            setNaissanceData({
                date_naissance: '',
                id_vache: ''
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'naissance ', error);
            setMessage('Le numéro  de la vache spécifié n\'existe pas'); // Message d'erreur
        }
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Ajouter une naissance</h2>
                <DatePicker
                    selected={naissanceData.date_naissance}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd" 
                    placeholderText="Date de naissance "
         
                />
                <input type="text" name="id_vache" value={naissanceData.id_vache} onChange={handleChange} placeholder="ID de la vache" required/>
                
               
                <br/><br/> 
                <button className="submit-add" type="submit"><b>Ajouter une naissance</b></button>
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
