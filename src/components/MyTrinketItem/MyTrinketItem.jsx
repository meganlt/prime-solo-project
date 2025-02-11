import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function MyTrinketItem( trinket ) {
  const forestMembers = useStore((state)=>state.forestMembers );
  // const [ borrower, setBorrower ] = useState('');

  let borrowed = false;
  let borrower = '';

  console.log('forest members:', forestMembers);
  console.log('trinket owner:', trinket.owner_user_id);

 
  function getBorrowerInfo( id ) {
    const borrowerInfo = forestMembers.find( forestMember => forestMember.id === id );
    return borrowerInfo;
  }

  if( trinket.trinket.owner_user_id !== trinket.trinket.holder_user_id){
    borrowed = true;
    
    borrower = getBorrowerInfo(trinket.trinket.holder_user_id);
    console.log(trinket.trinket.name, 'is borrowed by', borrower.username );
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