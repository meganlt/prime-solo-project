import useStore from '../../zustand/store'
import { useState, useEffect } from 'react';
import axios from 'axios';
import RequestDetail from '../RequestDetail/RequestDetail';
import MyTrinketItem from '../MyTrinketItem/MyTrinketItem';

function MyDen() {
  const user = useStore((state) => state.user);
  const fetchAllTrinkets = useStore( (state)=>state.fetchAllTrinkets);
  const allTrinkets = useStore((state) => state.allTrinkets );
  const forestMembers = useStore((state)=>state.forestMembers );
  const fetchForestMembers = useStore((state)=>state.fetchForestMembers );
  const logOut = useStore((state) => state.logOut);

  const [ isLoading, setIsLoading ] = useState(true); // Track loading state
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
    fetchAllTrinkets();
    fetchForestMembers();
  }, [] );

  useEffect( ()=>{
    const fetchData = async ()=>{
      if (allTrinkets.length === 0) {
        
        await fetchAllTrinkets(user.id);
        await fetchUserRequests(user.id);
      }
      if (forestMembers.length === 0) {
        await fetchForestMembers();
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, [ ] );

  if (isLoading) return <p>Loading Trinkets...</p>;
  if (!forestMembers.length) return <p>no forest members found</p>;

  const lendingItems = allTrinkets.filter( function(trinket){
    return trinket.holder_user_id != user.id && trinket.owner_user_id == user.id;
  });
  console.log('lendingItems', lendingItems);

  const borrowingItems = allTrinkets.filter( function(trinket){
    return trinket.holder_user_id == user.id && trinket.owner_user_id != user.id;
  });
  console.log('borrowingItems', borrowingItems);

  return (
    <>
      <h1>My Den</h1>
      <ul className="den-summary">
        <li><span className='den-summary-number'>{requestList.length}</span><br/> Requests</li>
        <li><span className='den-summary-number'>{lendingItems.length}</span><br/> Lending</li>
        <li><span className='den-summary-number'>{borrowingItems.length}</span><br/> Borrowing</li>
      </ul>
      <h2>Requests:</h2>
      {
        requestList.length > 0 ? (
          <p>you have some requests:</p>
        ) : (
          <p>No requests right now. Get out there and make some friends!</p>
        )
      }
      { 
      requestList.map( (request, index)=>(
        // TODO: Turn into a component so this isn't as complicated.
        <RequestDetail key={index} request={request} forestMembers={forestMembers} fetchUserRequests={fetchUserRequests}/>
        
      ))
      }
      <h2>Borrowing:</h2>
      {
        borrowingItems.length > 0 ? (
          <p>You are borrowing {borrowingItems.length} items right now:</p>
        ) : (
          <p>You aren't borrowing anything right now. Get out there and find some trinkets!</p>
        )
      }
      <ul className="trinket-list">
        {
          borrowingItems.map( (trinket, index)=>(
            <MyTrinketItem key={index} trinket={trinket} forestMembers={forestMembers}/>
          ))
        }
      </ul>
      <h2>Lending:</h2>
      {
        lendingItems.length > 0 ? (
          <p>You are lending {lendingItems.length} items right now:</p>
        ) : (
          <p>You aren't lending anything right now.</p>
        )
      }
      <ul className="trinket-list">
        {
          lendingItems.map( (trinket, index)=>(
            <MyTrinketItem key={index} trinket={trinket} forestMembers={forestMembers}/>
          ))
        }
      </ul>
      
    </>
  );
}


export default MyDen;
