import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './ajouter.css';

const AddVacheForm = ({ vache }) => {
    const [vacheData, setVacheData] = useState({
        id_vache: vache.id_vache,
        date_entree: vache.date_entree,
        race: vache.race
    });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (vache.id_vache) {
            fetchData(vache.id_vache);
        }
    }, [vache]);

    const fetchData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/vaches/${id}`);
            setVacheData(result.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }
    };

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
            const response = await axios.put(`http://localhost:5000/api/vaches/${vacheData.id_vache}`, vacheData);
            console.log(response.data);
            setMessage('Vache modifiée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la modification de la vache : ', error);
            setMessage('Erreur lors de la modification de la vache');
        }
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Modifier une vache</h2>

                <input type="text" name="id_vache" value={vacheData.id_vache} onChange={handleChange} placeholder="ID de la vache" disabled />
                <DatePicker
                    selected={vacheData.date_entree ? new Date(vacheData.date_entree) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Date d'entrée"
                />
                <select name="race" value={vacheData.race} onChange={handleChange}>
                    <option value="" disabled>Choisissez une race</option>
                    <option value="Holstein">Holstein</option>
                    <option value="Montbillard">Montbillard</option>
                </select>
                <br /><br />
                <button className="submit-add" type="submit"><b>Modifier une vache</b></button>
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

export default AddVacheForm;
