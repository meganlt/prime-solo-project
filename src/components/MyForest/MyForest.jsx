import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function MyForest() {
  
  const user = useStore((state) => state.user);
  const fetchAllTrinkets = useStore( (state)=>state.fetchUserTrinkets);
  const allTrinkets = useStore((state) => state.userTrinkets );
  const forestMembers = useStore((state)=>state.forestMembers );
  const fetchForestMembers = useStore((state)=>state.fetchForestMembers );

  return (
    <>
      <h1>MyForest</h1>
    </>
  );
}


export default MyForest;