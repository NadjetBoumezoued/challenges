import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import axios from 'axios';
import './ajouter.css'

const AddVacheForm = () => {
    const [vacheData, setVacheData] = useState({
        id_vache: '',
        date_entree: '', 
        race: '' 
    });
    const [message, setMessage] = useState(null); // Etat pour gérer le message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVacheData({
            ...vacheData,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setVacheData({
            ...vacheData,
            date_entree: formattedDate
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/vaches', vacheData);
            console.log(response.data); 
            setMessage('Vache ajoutée avec succès !'); // Message de succès
            setVacheData({
                id_vache: '',
                date_entree: '',
                race: ' '
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la vache : ', error);
            setMessage('Une vache avec ce numéro existe déjà'); // Message d'erreur
        }
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Ajouter une vache</h2>
                
                <input type="text" name="id_vache" value={vacheData.id_vache} onChange={handleChange} placeholder="ID de la vache" required/>
                <DatePicker
                    selected={vacheData.date_entree}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd" 
                    placeholderText="Date d'entrée"
         
                />
                <select name="race" value={vacheData.race} onChange={handleChange}>
                    <option value="" disabled selected>Choisissez une race</option>
                    <option value="Holstein">Holstein</option>
                    <option value="Montbillard">Montbillard</option>
                </select>
                <br/><br/> 
                <button className="submit-add" type="submit"><b>Ajouter une vache</b></button>
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
