import { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../zustand/store';
import { readAndCompressImage } from 'browser-image-resizer';
import * as React from 'react';
import Stack from '@mui/material/Stack';
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
  const user = useStore((state) => state.user);
  const fetchUserTrinkets = useStore( (state)=>state.fetchUserTrinkets);
  // Initial hook and setup for dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Hooks for S3 File Upload
  // Selected image file name
  const [fileName, setFileName] = useState('');
  // Selected file type
  const [fileType, setFileType] = useState('');
  // Selected image file
  const [selectedFile, setSelectedFile] = useState();
  // Selected image preview
  const [imagePreview, setImagePreview] = useState();

  const onFileChange = async (event) => {
    // Access the selected file
    const fileToUpload = event.target.files[0];

    // Resize and compress the image. Remove this if using something other
    // than an image upload.
    const copyFile = new Blob([fileToUpload], { type: fileToUpload.type, name: fileToUpload.name });
    const resizedFile = await readAndCompressImage(copyFile, {
      quality: 1.0,    // 100% quality
      maxHeight: 1000, // max height of the image
    });

    // Limit to specific file types.
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    // Check if the file is one of the allowed types.
    if (acceptedImageTypes.includes(fileToUpload.type)) {
      // Resizing the image removes the name, store it in a separate variable
      setFileName(encodeURIComponent(fileToUpload.name));
      setFileType(encodeURIComponent(fileToUpload.type));
      // Save the resized file
      setSelectedFile(resizedFile);
      // Create a URL that can be used in an img tag for previewing the image
      setImagePreview(URL.createObjectURL(resizedFile));
    } else {
      alert('Please select an image');
    }
  }

  const [ trinketCategory, setTrinketCategory ] = useState( '' );
  const handleCategoryChange = (event) => {  setTrinketCategory(event.target.value);};
  const [ trinketTerms, setTrinketTerms ] = useState( '' );
  const handleTermsChange = (event) => {  setTrinketTerms(event.target.value);};

  function addTrinket(e){
    e.preventDefault();
    console.log('in addTrinket');

    const formData = new FormData(e.currentTarget);
    formData.append('image', selectedFile);


    // const formJson = Object.fromEntries(formData.entries());

    axios.post(`/api/items?imageName=${fileName}&imageType=${fileType}`, formData ).then( function( response ){
      console.log( response );
      clearForm();
      fetchUserTrinkets(user.id);
    }).catch( function(err){
      console.log(err);
      alert('error posting to server');
    })

    handleClose();
  }

  const clearForm = () => {
    setFileName('');
    setFileType('');
    setSelectedFile(undefined);
    setImagePreview(undefined);
  }

  return (
    <>
      
      <React.Fragment>

        <button onClick={handleClickOpen} className="button-add-trinket">
            <span className="material-symbols-outlined" onClick={handleClickOpen}>add</span>
            Add New Trinket
          </button>
        
        <Dialog
          open={open}
          onClose={handleClose}
          className="dialog-container"
          slotProps={{
            paper: {
              component: 'form',
              onSubmit: addTrinket,
            },
          }}
        >
        <DialogTitle className="dialog-header">Add New Trinket</DialogTitle>
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
          <DialogContentText className="dialog-p">
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
          <input type="hidden" value={user.id} name="trinketUser" id="trinketUserInput"/>
          <FormControl required sx={{ m: 0, ml: 0, mt:2, pr:2, width: 1/2 }} size="small">
            <InputLabel id="select-category-label">Trinket Type</InputLabel>
            <Select
              labelId="select-category-label"
              id="trinketCategoryInput"
              value={trinketCategory}
              name="trinketCategory"
              label="Trinket Type"
              onChange={handleCategoryChange}
            >
              <MenuItem value="art-supply">Art Supply</MenuItem>
              <MenuItem value="blu-ray">Blu-Ray</MenuItem>
              <MenuItem value="cd">CD</MenuItem>
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
                name="trinketTerms"
                onChange={handleTermsChange}
              >
                <MenuItem value="short-term">Short-Term Borrow</MenuItem>
                <MenuItem value="long-term">Long-Term Borrow</MenuItem>
                <MenuItem value="giveaway">Giveaway</MenuItem>
              </Select>
          </FormControl>
          <p><InputLabel>Description</InputLabel> It helps to include some information about how to use your trinket, or a hint of the plot if it's a book or movie. </p>
          <TextField
            id="trinketDescInput"
          name="trinketDesc"
          multiline
          minRows={4}
          maxRows={8}
          fullWidth
          />
          <label className="input-label-file">Trinket Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          {
            imagePreview && (
              <>
                <p>Preview:</p>
                <img style={{maxHeight: '100px'}} src={imagePreview} />
              </>
            )
          }  
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button type="submit">Add Trinket</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </>
  );
}


export default AddTrinket;