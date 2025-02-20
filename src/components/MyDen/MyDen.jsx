import useStore from '../../zustand/store'
import { useState, useEffect } from 'react';
import axios from 'axios';
import RequestDetail from '../RequestDetail/RequestDetail';

function MyDen() {
  const user = useStore((state) => state.user);
  const forestMembers = useStore((state)=>state.forestMembers );
  const fetchForestMembers = useStore((state)=>state.fetchForestMembers );
  const logOut = useStore((state) => state.logOut);

  const [ requestList, setRequestList ] = useState( [] );

  function fetchUserRequests(userId){
    console.log('in fetchRequests', userId);
    axios.get(`/api/requests/${userId}`).then( function(response){
      console.log('back from GET:', response.data);
      setRequestList( response.data );
    }).catch( function(err){
      console.log( err );
      alert('error getting users requests');
    })
  }
  useEffect( ()=>{
    fetchUserRequests(user.id);
    fetchForestMembers();
  }, [] );

  

  return (
    <>
      <h1>My Den</h1>
      <ul>
        <li>2 Requests</li>
        <li>2 Lending</li>
        <li>2 Borrowing</li>
      </ul>
      <h2>Requests:</h2>
      {
      requestList.map( (request, index)=>(
        // TODO: Turn into a component so this isn't as complicated.
        <RequestDetail key={index} request={request} forestMembers={forestMembers}/>
        
      ))
      }
      {JSON.stringify(requestList)}
      {JSON.stringify(forestMembers)}
    </>
  );
}


export default MyDen;
