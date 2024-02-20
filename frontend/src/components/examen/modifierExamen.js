import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import '../vache/ajouter.css';

const ModifierExamForm = ({ exam }) => {
    
    const [examData, setExamData] = useState({
        id_exam:exam.id_exam,
        date_exam:exam.date_exam,
        id_vache: exam.id_vache,
        maladie: exam.maladie,
    
    });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (exam.id_exam) {
            fetchData(exam.id_exam);
        }
    }, [exam]);

    const fetchData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/exams/${id}`);
            setExamData(result.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }
    };

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
            const response = await axios.put(`http://localhost:5000/api/exams/${examData.id_exam}`, examData);
            console.log(response.data);
            setMessage('Exam modifiée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la modification  : ', error);
            setMessage('Le numéro de la vache spécifié n\'existe pas');
        }
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Modifier un examen médicale</h2>

                 <DatePicker
                    selected={examData.date_exam? new Date(examData.date_exam) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Date d'examen"
                    disabled
                />
                 <input type="text" name="id_vache" value={examData.id_vache} onChange={handleChange} placeholder="ID de la vache" required />
              
                 <input type="text" name="maladie" value={examData.maladie} onChange={handleChange} placeholder="Maladie" required />
              
                <br /><br />
                <button className="submit-add" type="submit"><b>Modifier un examen médicale</b></button>
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

export default ModifierExamForm;
