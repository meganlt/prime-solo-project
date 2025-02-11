import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function AddTrinket() {
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [ trinketCategory, setTrinketCategory ] = useState( '' );
  const handleCategoryChange = (event) => {
    setTrinketCategory(event.target.value);
  };
  const [ trinketTerms, setTrinketTerms ] = useState( '' );
  const handleTermsChange = (event) => {
    setTrinketTerms(event.target.value);
  };

  function addTrinket(e){
    e.preventDefault();
    console.log('in addTrinket');

    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const objectToSend = { 
      trinketName: formJson.trinketName,
      trinketCategory: trinketCategory,
      trinketTerms: trinketTerms,
      trinketDesc: formJson.trinketDesc
    };
    console.log(objectToSend);
    handleClose();
  }

  return (
    <>
      
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
        <span className="material-symbols-outlined" onClick={handleClickOpen}>add</span>
        Add New Trinket
        </Button>
        <button className="button">
        <span className="material-symbols-outlined" onClick={handleClickOpen}>add</span>
        Add New Trinket
      </button>
        <Dialog
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              component: 'form',
              onSubmit: (e) => addTrinket(e),
            },
          }}
        >
        <DialogTitle>Add New Trinket</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <DialogContentText>
            Add a new trinket to your den, so you can share it with your forest!
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="trinketNameInput"
            name="trinketName"
            label="Trinket Name"
            type="text"
            size="small"
            variant="outlined"
            fullWidth
          />
          <FormControl required sx={{ m: 0, ml: 0, mt:2, pr:2, width: 1/2 }} size="small">
            <InputLabel id="select-category-label">Trinket Type</InputLabel>
            <Select
              labelId="select-category-label"
              id="trinketCategoryInput"
              value={trinketCategory}
              label="Trinket Type"
              onChange={handleCategoryChange}
            >
              <MenuItem value="art-supply">Art Supply</MenuItem>
              <MenuItem value="blu-ray">Blu-Ray</MenuItem>
              <MenuItem value="craft-supply">Craft Supply</MenuItem>
              <MenuItem value="dvd">DVD</MenuItem>
              <MenuItem value="book">Book</MenuItem>
              <MenuItem value="tool">Tool</MenuItem>
              <MenuItem value="video-game">Video Game</MenuItem>
            </Select>
        </FormControl>
        <FormControl required sx={{ m: 0, mt: 2, width: 1/2  }} size="small">
            <InputLabel id="borrow-select-label">Borrow Type</InputLabel>
            <Select
              labelId="borrow-select-label"
              id="trinketTermsInput"
              value={trinketTerms}
              label="Trinket Type"
              onChange={handleTermsChange}
            >
              <MenuItem value="short-term">Short-Term Borrow</MenuItem>
              <MenuItem value="long-term">Long-Term Borrow</MenuItem>
              <MenuItem value="giveaway">Giveaway</MenuItem>
            </Select>
        </FormControl>          
          <h3>Description:</h3>
          <p>It helps to include some information about how to use your trinket, or a hint of the plot if it's a book or movie. Include links to any instruction manuals, product pages, or reviews you've written off-site!</p>
        <InputLabel>Description</InputLabel>
        <TextField
          id="trinketDescInput"
          name="trinketDesc"
          multiline
          minRows={4}
          maxRows={8}
          fullWidth
        />

          Trinket Image:
          <Button>Choose Image</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Trinket</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </>
  );
}


export default AddTrinket;