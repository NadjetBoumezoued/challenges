import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import '../vache/vache.css'; 
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import AjouterExamen from './ajouterExamen'; 
import ModifierExamen from './modifierExamen'; 

function Examen() {
  const [exams, setExams] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6); // nombre elements par page
  const [totalItems, setTotalItems] = useState(0);
  const [openDialog, setOpenDialog] = useState(false); 
  const [openDialogPut, setOpenDialogPut] = useState(false); 
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page]); 

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/api/exams`);
    setExams(result.data);
    setTotalItems(result.data.length);
  };

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const handleNextPage = () => {
    if (endIndex < totalItems) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setOpenDialogPut(false);
  };

  const handleOpenDialogPut = (exam) => {
    setSelectedExam(exam);
    setOpenDialogPut(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    fetchData(); 
  };

  const handleCloseDialogPut = () => {
    setOpenDialogPut(false);
    fetchData(); 
  };

  //supprimer
  const handleDeleteExam = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/exams/${id}`);
      fetchData(); // Actualiser data 
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div className="vache-container">
      <div className="vache-header">
        <h2>Liste des Examens Médicaux</h2>
        <button onClick={handleOpenDialog}>
          <b>Ajouter un examen</b>
        </button>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table className="vache-table">
          <TableHead>
            <TableRow>
              <TableCell>Date d'examen</TableCell>
              <TableCell>Numéro de vache</TableCell>
              <TableCell>Maladie</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.slice(startIndex, endIndex).map((exam) => (
              <TableRow key={exam.id_exam}>
                
                <TableCell>{exam.date_exam}</TableCell>
                <TableCell>{exam.id_vache}</TableCell>
                <TableCell>{exam.maladie}</TableCell>
                <TableCell>
                  <EditIcon onClick={() => { handleOpenDialogPut(exam); }} />
                  <DeleteIcon onClick={() => handleDeleteExam(exam.id_exam)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="pagination-buttons">
          <Button onClick={handlePrevPage} disabled={page === 1}>Précédent</Button>
          <Button onClick={handleNextPage} disabled={endIndex >= totalItems}>Suivant</Button>
        </div>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}> 
        <DialogContent>
          <AjouterExamen onSuccess={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
        </DialogActions>     
      </Dialog>

      <Dialog open={openDialogPut} onClose={handleCloseDialogPut}>
        <DialogContent>
          <ModifierExamen exam={selectedExam} onSuccess={handleCloseDialogPut} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogPut}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Examen;
