import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function MyTrinkets() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);
  const trinkets = useStore( (state)=>state.trinkets );
  const fetchTrinkets = useStore( (state)=>state.fetchTrinkets);

  useEffect( ()=>{
    fetchUser();
    fetchTrinkets();
  }, [] );

  
  console.log('trinkets', trinkets);
  // TO DO: figure out why this isn't working:
  // const userTrinkets = trinkets.filter( (trinket)=>(trinket.owner_user_id == user.id));

  return (
    <>
      <h1>MyTrinkets</h1>
      <button className="button"><span className="material-symbols-outlined">add</span>Add New Trinket</button>
      <h2>All trinkets:</h2>
      {/* {JSON.stringify(trinkets)} */}
      <h2>Just User's Trinkets</h2>
      {/* {JSON.stringify(userTrinkets)} */}
    </>
  );
}


export default MyTrinkets;