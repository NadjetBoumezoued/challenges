import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import '../vache/ajouter.css';

const ModifierNaissanceForm = ({ naissance }) => {
    
    const [naissanceData, setNaissanceData] = useState({
        id_naiss:naissance.id_naiss,
        date_naissance:naissance.date_naissance,
        id_vache: naissance.id_vache,
       
    
    });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (naissance.id_naiss) {
            fetchData(naissance.id_naiss);
        }
    }, [naissance]);

    const fetchData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/naiss/${id}`);
            setNaissanceData(result.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }
    };

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
            const response = await axios.put(`http://localhost:5000/api/naiss/${naissanceData.id_naiss}`, naissanceData);
            console.log(response.data);
            setMessage('Naissance modifiée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la modification  : ', error);
            setMessage('Le numéro  de la vache spécifié n\'existe pas');
        }
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Modifier un naissance</h2>
                <input type="text" name="id_naiss" value={naissanceData.id_naiss} onChange={handleChange} placeholder="ID Naissance" disabled />
             
                <input type="text" name="id_vache" value={naissanceData.id_vache} onChange={handleChange} placeholder="ID de la vache" required />
                <DatePicker
                    selected={naissanceData.date_naissance? new Date(naissanceData.date_naissance) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Date d'naissanceen"
                />
               
                <br /><br />
                <button className="submit-add" type="submit"><b>Modifier un naissance</b></button>
                <br />
            </form>
            {message && (
                <div className={message.includes('Erreur') ? 'error-message' : 'success-message'} style={{ textAlign: 'center' }}>
                    {message}
                </div>  
            )}
        </div>
    );
};

export default ModifierNaissanceForm;
