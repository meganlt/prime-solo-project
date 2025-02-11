import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import MyTrinketItem from '../MyTrinketItem/MyTrinketItem';

function MyTrinkets() {
  const user = useStore((state) => state.user);
  // const fetchUser = useStore((state) => state.fetchUser);
  const fetchUserTrinkets = useStore( (state)=>state.fetchUserTrinkets);
  const userTrinkets = useStore((state) => state.userTrinkets );
  const forestMembers = useStore((state)=>state.forestMembers );
  const fetchForestMembers = useStore((state)=>state.fetchForestMembers );

  useEffect( ()=>{
    fetchUserTrinkets(user.id);
    fetchForestMembers();
  }, [] );

  
  // console.log('user data:', user.id);
  console.log(userTrinkets);
  console.log('Forest Members:',forestMembers);

  return (
    <>
      <h1>MyTrinkets</h1>
      <button className="button"><span className="material-symbols-outlined">add</span>Add New Trinket</button>
      <h2>{user.username}'s Trinkets</h2>
      <ul className="trinket-list">
        {
          userTrinkets.map( (trinket, index)=>(
            <MyTrinketItem key={index} trinket={trinket}/>
          ))
        }
      </ul>
    </>
  );
}


export default MyTrinkets;