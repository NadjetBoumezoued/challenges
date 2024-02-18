import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import '../vache/vache.css'; 
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import AjouterNaissance from './ajouterNaissance'; 
import ModifierNaissance from './modifierNaissance'; 

function Naissance() {
  const [naissances, setNaissances] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6); // nombre elements par page
  const [totalItems, setTotalItems] = useState(0);
  const [openDialog, setOpenDialog] = useState(false); 
  const [openDialogPut, setOpenDialogPut] = useState(false); 
  const [selectedNaissance, setSelectedNaissance] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page]); 

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/api/naiss`);
    setNaissances(result.data);
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

  const handleOpenDialogPut = (naissance) => {
    setSelectedNaissance(naissance);
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
  const handleDeleteNaissance = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/naiss/${id}`);
      fetchData(); // Actualiser data 
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div className="vache-container">
      <div className="vache-header">
        <h2>Liste des Naissances </h2>
        <button onClick={handleOpenDialog}>
          <b>Ajouter une naissance</b>
        </button>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table className="vache-table">
          <TableHead>
            <TableRow>
              <TableCell>ID naissance</TableCell>
              <TableCell>Date de naissance</TableCell>
              <TableCell>Numéro de vache</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {naissances.slice(startIndex, endIndex).map((naissance) => (
              <TableRow key={naissance.id_naiss}>
                 <TableCell>{naissance.id_naiss}</TableCell>
                <TableCell>{naissance.date_naissance}</TableCell>
                <TableCell>{naissance.id_vache}</TableCell>
               
                <TableCell>
                  <EditIcon onClick={() => { handleOpenDialogPut(naissance); }} />
                  <DeleteIcon onClick={() => handleDeleteNaissance(naissance.id_naiss)} />
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
          <AjouterNaissance onSuccess={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
        </DialogActions>     
      </Dialog>

      <Dialog open={openDialogPut} onClose={handleCloseDialogPut}>
        <DialogContent>
          <ModifierNaissance naissance={selectedNaissance} onSuccess={handleCloseDialogPut} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogPut}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Naissance;
