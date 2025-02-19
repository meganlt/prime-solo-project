import useStore from '../../zustand/store'
import { useState, useEffect } from 'react';
import axios from 'axios';


function HomePage() {
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
      <p>Your username is: {user.username}</p>
      <p>Your ID is: {user.id}</p>
      <h2>requests:</h2>
      {
      requestList.map( (request, index)=>(
        // TODO: Turn into a component so this isn't as complicated.
        <div key={index}>
          <img src={forestMembers.find( forestMember => forestMember.id === request.sent_by).avatar}/>
          <p>request from: {forestMembers.find( forestMember => forestMember.id === request.sent_by).username}</p>
        </div>
      ))
      }
      {JSON.stringify(requestList)}
      {JSON.stringify(forestMembers)}
    </>
  );
}


export default HomePage;
