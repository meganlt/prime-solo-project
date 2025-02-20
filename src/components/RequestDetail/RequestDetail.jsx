import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import axios from 'axios';
import { Button } from '@mui/material';

function RequestDetail(request) {
  console.log('request:', request);
  const requester = request.forestMembers.find( forestMember => forestMember.id === request.request.sent_by);
  const [ requestResponse, setRequestResponse ] = useState( '' );
  const handleRequestResponseChange = (event) => {  setRequestResponse(event.target.value);};

  function updateRequest(){
    console.log('in updateRequest');
    const objectToSend = {
      itemId: request.request.message_item,
      requestId: request.request.request_id,
      requestedBy: request.request.sent_by,
      itemOwner: request.request.owner_user_id,
      requestResponse: requestResponse
    }
    console.log('objectTosend:', objectToSend);
    axios.put('/api/requests', objectToSend).then( function(response){
      console.log('back from Put:/', response.data);
    }).catch( function(err){
      console.log(err);
      alert('error setting request');
    });
  }

  function createYesRequestResponse(){
    console.log('in createYesRequestResponse');
    const objectToSend = {
      requestType: 'request-response',
      requestDetails: requestResponse,
      requestedBy: request.request.sent_to,
      requestedTo: request.request.sent_by,
      itemRequested: request.request.message_item
    }
    console.log('in sendRequest:', objectToSend);

    axios.post('/api/requests', objectToSend).then( function(response){
      console.log('back from POST:', response.data);
    }).catch( function(err){
      console.log(err);
      alert('error sending request!');
    })
  }

  function sendRequestResponse(e){
    e.preventDefault();
    console.log('in sendRequest');

    updateRequest();
    createYesRequestResponse();

  }

  return (
    <>
      <div className='request-card'>
        <div className='requester-info'>
          <h2>From:</h2>
          <img src={requester.avatar} className='request-avatar' />
          <h3>{requester.username}</h3>
        </div>
        <div className='trinket-info'>
          <h2>Can I borrow this?</h2>
          <img src={request.request.image} className='trinket-image'/>
          <div>
            <h3>{request.request.name}</h3>
            <p>{request.request.type}</p>
            <p className='request-details'>{request.request.details}</p>
          </div>
        </div>
        
        <div>
          <h2>Respond:</h2>
          <form onSubmit={sendRequestResponse}>
            <input type="radio" id="responseInputYes" name="responseInput" value="Yes" required onChange={handleRequestResponseChange}/>
            <label htmlFor="responseInputYes">Yes, call me to arrange pickup!</label><br/>
            <input type="radio" id="responseInputNo" name="responseInput" value="No" required onChange={handleRequestResponseChange}/>
            <label htmlFor="responseInputNo">Sorry, not now!</label><br/>
            <Button variant="contained" type="submit">respond</Button>
          </form>
        </div>
          
          
          
       </div>
    </>
  );
}


export default RequestDetail;