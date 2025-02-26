import { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../zustand/store';
import { readAndCompressImage } from 'browser-image-resizer';
import * as React from 'react';
import Button from '@mui/material/Button';
import CheckBox from '@mui/material/Checkbox';
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

function EditTrinket(trinket) {
  const user = useStore((state) => state.user);
  const fetchAllTrinkets = useStore( (state)=>state.fetchAllTrinkets);
  const allTrinkets = useStore((state) => state.allTrinkets );
  const fetchUserTrinkets = useStore( (state)=>state.fetchUserTrinkets);
  console.log(trinket);
  const fetchUserRequests = useStore( (state)=>state.fetchUserRequests);
  
  // Initial hook and setup for dialog
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditClickOpen = () => {  setOpenEdit(true);};
  const handleEditClose = () => {  setOpenEdit(false); };

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

  const [ trinketCategory, setTrinketCategory ] = useState( trinket.trinket.category );
  const handleCategoryChange = (event) => {  setTrinketCategory(event.target.value);};
  const [ trinketTerms, setTrinketTerms ] = useState( trinket.trinket.term );
  const handleTermsChange = (event) => {  setTrinketTerms(event.target.value);};
  const [ trinketStatus, setTrinketStatus ] = useState( trinket.trinket.status );
  const handleStatusChange = (event) => {  setTrinketStatus(event.target.value);};

  const handleTrinketReturn = (event) => {
    // console.log('initial value:', trinketHolder);

    let checkedInputState = document.getElementById('returnHomeInput').checked;


    // setTrinketReturn(event.target.value);
  };

  function editTrinket(e){
    e.preventDefault();
    console.log('in editTrinket');

    const formData = new FormData(e.currentTarget);
    formData.append('image', selectedFile);

    axios.put(`/api/items?imageName=${fileName}&imageType=${fileType}`, formData ).then( function( response ){
      console.log( response );
      clearForm();
      fetchUserTrinkets(user.id);
      fetchAllTrinkets(user.id);
      fetchUserRequests(user.id);
    }).catch( function(err){
      console.log(err);
      alert('error posting to server');
    })

    handleEditClose();
  }

  const clearForm = () => {
    setFileName('');
    setFileType('');
    setSelectedFile(undefined);
    setImagePreview(undefined);
  }

  function deleteTrinket(e){
    console.log('in deleteTrinket', trinket.trinket.id);

    let checkedInputState = document.getElementById('deleteCheck').checked;

    if(checkedInputState){
      e.preventDefault();
      axios.delete(`/api/items?id=${trinket.trinket.id}`).then( function(response){
        console.log('back from delete:', response.data);
        handleEditClose();
        fetchUserTrinkets(user.id);
        fetchAllTrinkets(user.id);
        fetchUserRequests(user.id);
      }).catch( function(err){
        console.log(err);
        alert('error deleting trinket');
      });
    } else {
      alert('check box first!');
    }

    
  }

  return (
    <>
      
      <React.Fragment>
        <button onClick={handleEditClickOpen}><span className="material-symbols-outlined">edit</span></button>
        <Dialog
          open={openEdit}
          onClose={handleEditClose}
          className="dialog-container"
          slotProps={{
            paper: {
              component: 'form',
              onSubmit: editTrinket,
            },
          }}
        >
        <DialogTitle className="dialog-header">Edit Trinket</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleEditClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="edit-container" dividers>
        <div className='edit-actions'>
        <label className="input-label-file">Trinket Image:</label>
        <img src={trinket.trinket.image} width="100%"/>
        <label htmlFor="newFile" className="input-label-file">Choose a new image:</label>
          <input
          id="newFile"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          
          {
            imagePreview && (
              <>
                <p>Preview of New Image:</p>
                <img style={{maxHeight: '100px'}} src={imagePreview} />
              </>
            )
          }  
          <DialogContentText className='delete-content'>
            <label className='delete-label'>Delete This Trinket:</label>
            <label htmlFor="deleteCheck">
              <input type="checkbox" id="deleteCheck" label="Yes, I'm sure" color="error"/> 
              Yes, I want to delete this.
              </label>
            <button className='button-delete' onClick={deleteTrinket}>Confirm Deletion</button>
          </DialogContentText>
        </div>
        <div className='edit-inputs'>
        <TextField
            required
            margin="dense"
            id="trinketNameInput"
            name="trinketName"
            label="Trinket Name"
            type="text"
            size="small"
            defaultValue={trinket.trinket.name}
            variant="outlined"
            fullWidth
          />
          <input type="hidden" value={user.id} name="trinketUser" id="trinketUserInput"/>
          <input type="hidden" value={trinket.trinket.id} name="trinketId" id="trinketIdInput"/>
          <input type="hidden" value={trinket.trinket.holder_user_id} name="trinketHolderId" id="trinketHolderIdInput"/>
          {/* <input type="checkbox" id="returnHomeInput"color="error" onChange={handleTrinketReturn}/> <label htmlFor="returnHomeInput">This item was just returned!</label><br/>   */}
          <FormControl required sx={{ m: 0, ml: 0, mt:2, pr:2, width: 1/2 }} size="small">
            <InputLabel id="select-category-label">Trinket Type</InputLabel>
            <Select
              labelId="select-category-label"
              id="trinketCategoryInput"
              defaultValue={trinket.trinket.category}
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
              defaultValue={trinket.trinket.term}
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
        <FormControl required sx={{ m: 0, mt: 2, width: 1/2  }} size="small">
            <InputLabel id="borrow-select-label">Status:</InputLabel>
            <Select
              labelId="borrow-select-label"
              id="trinketStatusInput"
              defaultValue={trinket.trinket.status}
              value={trinketStatus}
              label="Trinket Type"
              name="trinketStatus"
              onChange={handleStatusChange}
            >
              <MenuItem value="available">available</MenuItem>
              <MenuItem value="hidden">hidden</MenuItem>
              <MenuItem value="borrowed">borrowed</MenuItem>
            </Select>
        </FormControl>
                
          <p><InputLabel>Description</InputLabel>It helps to include some information about how to use your trinket, or a hint of the plot if it's a book or movie. </p>
          <TextField
            id="trinketDescInput"
          name="trinketDesc"
          multiline
          minRows={4}
          maxRows={8}
          fullWidth
          defaultValue={trinket.trinket.description}
          />
        </div>
          
          
        </DialogContent>
        
        <DialogActions>
          {/* TO DO: fix this button so it doesn't submit changes when canceling
          <button onClick={handleEditClose}>Cancel</button> */}
          <button type="submit">Edit Trinket</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </>
  );
}


export default EditTrinket;