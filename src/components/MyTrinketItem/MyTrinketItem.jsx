import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function MyTrinketItem( trinket ) {
  // console.log("Received trinket:", trinket); // Debugging log

  if (!trinket) {
    return <p>Loading Trinket...</p>; // Prevents crashing on undefined values
  }

  // Initial Borrower valeus
  let borrowed = false;
  let borrower = {};
 
  // Getting any Borrower information needed
  function getBorrowerInfo( id ) {
    const borrowerInfo = trinket.forestMembers.find( forestMember => forestMember.id === id );
    return borrowerInfo;
  }

  // Checking to see if the trinket is currently being borrowed, and if so, 
  // Updating borrower info to pull in
  if( trinket.trinket.owner_user_id !== trinket.trinket.holder_user_id){
    borrowed = true;
    borrower = getBorrowerInfo(trinket.trinket.holder_user_id);
    // console.log(trinket.trinket.name, 'is borrowed by', borrower.username );
  }

  return (
    <li className={ `borrowed-${borrowed}`}>
      <h3>{trinket.name}</h3>
        <img src={trinket.image}/>
        <p>owner: {trinket.owner_user_id}</p>
        <p>category: {trinket.category}</p>
          { borrowed ? 
            <p>BEING BORROWED by {borrower.username} </p> 
            : 
            <p>at home<button>Edit</button></p> 
          } 
    </li>
  );
}


export default MyTrinketItem;