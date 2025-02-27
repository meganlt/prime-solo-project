import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


function MyForestTrinket(trinket) {

  const user = useStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {  setOpen(true);};
  const handleClose = () => {  setOpen(false);};

  const [ requestDetails, setRequestDetails ] = useState( '' );
  const handleRequestDetailsChange = (event) => {  setRequestDetails(event.target.value);};

  function sendRequest(e){
    e.preventDefault();
    
    const objectToSend = {
      "requestType": 'borrow-request',
      "requestedBy": user.id,
      "requestedTo": trinket.trinket.owner_user_id,
      "requestDetails": requestDetails,
      "itemRequested": trinket.trinket.id
    }
    console.log('in sendRequest:', objectToSend);

    axios.post('/api/requests', objectToSend).then( function(response){
      console.log('back from POST:', response.data);
      handleClose();
    }).catch( function(err){
      console.log(err);
      alert('error sending request!');
    })
  }

  return (
    <>
      <tr className="forest-trinket" onClick={handleClickOpen}>
        <td><img src={trinket.trinket.image}/></td>
        <td>{trinket.trinket.name}</td>
        <td><p className={`trinket-category-text trinket-category-${trinket.trinket.category}`}>{trinket.trinket.category}</p></td>
        <td>{trinket.trinket.term}</td>
        <td className='owner'><img src={trinket.trinket.avatar} width="50px"/>{trinket.trinket.username}</td>
      </tr>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          className='dialog-container'
          slotProps={{
            paper: {
              component: 'form',
              onSubmit: sendRequest,
            },
          }}
        >
        <DialogTitle className="dialog-header">{trinket.trinket.name}</DialogTitle>
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
        <DialogContent dividers className=''>
          <div className='trinket-detail-modal'>
            <div className='image-container'>
              <img src={trinket.trinket.image}/>
              <p className={`trinket-category-text trinket-category-${trinket.trinket.category}`}>{trinket.trinket.category}</p>
            </div>
            <div className='detail-container'>
              <p><span className="trinket-label">Borrow Terms:</span> {trinket.trinket.term}</p>
              <p className='trinket-owner'><span className="trinket-label">Owned by:</span><img className="trinket-owner-image" src={trinket.trinket.avatar} width="50px"/>{trinket.trinket.username}</p>
              <p><span className="trinket-label">Description:</span></p>
              <p>{trinket.trinket.description}</p>
            </div>
          </div>
          <div className='request-detail-form'>
              <h2>Request to Borrow:</h2>
              <input type="hidden" value={user.id} name="trinketRequester" id="trinketRequesterInput"/>
              <input type="hidden" value={trinket.trinket.owner_user_id} name="trinketOwnerId" id="trinketOwnerIdInput"/>
              <InputLabel><span className="trinket-label">Additonal Details (optional)</span></InputLabel>
              <TextField
                id="trinketDescInput"
              name="trinketDesc"
              multiline
              minRows={4}
              maxRows={8}
              fullWidth
              onChange={handleRequestDetailsChange}
              /> 
            </div>


        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button type="submit">send request</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </>
    
  );
}


export default MyForestTrinket;