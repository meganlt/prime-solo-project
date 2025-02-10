import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function MyTrinkets() {
  const user = useStore((state) => state.user);
  // const fetchUser = useStore((state) => state.fetchUser);
  const fetchUserTrinkets = useStore( (state)=>state.fetchUserTrinkets);
  const userTrinkets = useStore((state) => state.userTrinkets );

  useEffect( ()=>{
    fetchUserTrinkets(user.id);
  }, [] );

  
  console.log('user data:', user.id);

  return (
    <>
      <h1>MyTrinkets</h1>
      <button className="button"><span className="material-symbols-outlined">add</span>Add New Trinket</button>
      <h2>{user.username}'s Trinkets</h2>
      {JSON.stringify(userTrinkets)}
    </>
  );
}


export default MyTrinkets;