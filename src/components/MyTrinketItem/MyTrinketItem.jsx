import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import axios from 'axios';
import EditTrinket from '../EditTrinket/EditTrinket';

function MyTrinketItem( trinket ) {
  // console.log("Received trinket:", trinket); // Debugging log
  const user = useStore((state) => state.user);

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

  // Checking to see if the trinket is currently being borrowed, and if so, updating borrower info to pull in
  if( trinket.trinket.owner_user_id !== trinket.trinket.holder_user_id){
    borrowed = true;
    borrower = getBorrowerInfo(trinket.trinket.holder_user_id);
    // console.log(trinket.trinket.name, 'is borrowed by', borrower.username );
  }

  return (
    <li className={ `borrowed-${borrowed} trinket-${trinket.trinket.category}`}>
      <div className='trinket-header'>
        
        { borrowed && borrower.id !== user.id ? 
          <p><img src={borrower.avatar} width="55px"/><span>In {borrower.username}'s Den</span></p> 
          : 
          <p>&nbsp;</p> 
        }
        { 
          trinket.trinket.owner_user_id === user.id ? (
            <EditTrinket trinket={trinket.trinket}/>
          ) : (
            <></>
          )
        }
      </div>
      
      
      <img className="trinket-image" src={trinket.trinket.image} width="100%"/>
      <div className="trinket-details">
        <h3>{trinket.trinket.name}</h3>
        <p>owner: {trinket.trinket.owner_user_id}</p>
        <p className={`trinket-category-text trinket-category-${trinket.trinket.category}`}>category: {trinket.trinket.category}</p>
           
      </div>
      
    </li>
  );
}


export default MyTrinketItem;