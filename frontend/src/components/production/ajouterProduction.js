import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import axios from 'axios';
import '../vache/ajouter.css'

const AddProdForm = () => {
    const [productionData, setProductionData] = useState({
        date_production: '',
        qte: ''
    });
    const [message, setMessage] = useState(null); // Etat pour gérer le message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductionData({
            ...productionData,
            [name]: value
        });
    };

   
    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setProductionData({
            ...productionData,
            date_production: formattedDate
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/prod', productionData);
            console.log(response.data); 
            setMessage('Quantité de lait ajoutée avec succès !'); // Message de succès
            setProductionData({
                date_production: '',
                qte: ''
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'production ', error);
            setMessage('Vous avez déja saisi la quantité de lait pour ce jour '); // Message d'erreur
        }
     };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Ajouter une production</h2>
                <DatePicker
                    selected={productionData.date_production}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd" 
                    placeholderText="Date de production "
         
                />
                <input type="text" name="qte" value={productionData.qte} onChange={handleChange} placeholder="Quantité du lait" required/>
                
               
                <br/><br/> 
                <button className="submit-add" type="submit"><b>Ajouter une production</b></button>
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

export default AddProdForm;
