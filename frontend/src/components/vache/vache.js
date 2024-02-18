import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import './vache.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AjouterVache from './ajouterVache';
import ModifierVache from './modifierVache';

function Vache() {
  const [vaches, setVaches] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6); // nombre elements par page
  const [totalItems, setTotalItems] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogPut, setOpenDialogPut] = useState(false);
  const [selectedVache, setSelectedVache] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/api/vaches`);
    setVaches(result.data);
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

  const handleOpenDialogPut = (vache) => {
    setSelectedVache(vache);
    setOpenDialogPut(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    fetchData(); // Refresh data upon closing dialog
  };

  const handleCloseDialogPut = () => {
    setOpenDialogPut(false);
    fetchData(); // Refresh data upon closing dialog
  };

  //supprimer vache
  const handleDeleteVache = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vaches/${id}`);
      fetchData(); // Actualiser data 
    } catch (error) {
      console.error('Erreur lors de la suppression de la vache :', error);
    }
  };

  return (
    <div className="vache-container">
      <div className="vache-header">
        <h2>Liste des vaches</h2>
        <button onClick={handleOpenDialog}>
          <b>Ajouter une vache</b>
        </button>
      </div>
      
     
      <TableContainer component={Paper} className="table-container">
        <Table className="vache-table">
          <TableHead>
            <TableRow>
              <TableCell>
              <TextField
        label="Numéro de vache"
        value={searchTerm}
        size="small"
        onChange={(e) => setSearchTerm(e.target.value)}
        InputLabelProps={{
          style: { fontSize: 12 } 
        }}
       
      /> </TableCell>
              <TableCell>Date d'entrée</TableCell>
              <TableCell>Race</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaches
              .filter((vache) =>
                vache.id_vache.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(startIndex, endIndex)
              .map((vache) => (
                <TableRow key={vache.id_vache}>
                  <TableCell>{vache.id_vache}</TableCell>
                  <TableCell>{vache.date_entree}</TableCell>
                  <TableCell>{vache.race}</TableCell>
                  <TableCell>
                    <EditIcon onClick={() => { handleOpenDialogPut(vache); }} />
                    <DeleteIcon onClick={() => handleDeleteVache(vache.id_vache)} />
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
          <AjouterVache onSuccess={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogPut} onClose={handleCloseDialogPut}>
        <DialogContent>
          <ModifierVache vache={selectedVache} onSuccess={handleCloseDialogPut} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogPut}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Vache;
