import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import '../vache/ajouter.css';

const ModifierProductionForm = ({ production }) => {
    
    const [productionData, setProductionData] = useState({
        id_prod:production.id_prod,
        date_production:production.date_production,
        qte: production.qte,
       
    
    });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (production.id_prod) {
            fetchData(production.id_prod);
        }
    }, [production]);

    const fetchData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/prod/${id}`);
            setProductionData(result.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }
    };

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
            const response = await axios.put(`http://localhost:5000/api/prod/${productionData.id_prod}`, productionData);
            console.log(response.data);
            setMessage('Quantité de lait modifiée avec succès ');
        } catch (error) {
            console.error('Erreur lors de la modification  : ', error);
            setMessage('Erreur lors de la modification');
        }
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Modifier la quantité de lait</h2>

                 <DatePicker
                    selected={productionData.date_production? new Date(productionData.date_production) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Date de production"
                    disabled
                />
                <input type="text" name="qte" value={productionData.qte} onChange={handleChange} placeholder="Quantité du lait " required />
              
                <br /><br />
                <button className="submit-add" type="submit"><b>Modifier la quantité de lait</b></button>
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

export default ModifierProductionForm;
