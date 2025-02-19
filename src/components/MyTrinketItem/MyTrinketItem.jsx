import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import axios from 'axios';
import EditTrinket from '../EditTrinket/EditTrinket';

function MyTrinketItem( trinket ) {
  // console.log("Received trinket:", trinket); // Debugging log

  // Used to display uploaded images on the page
  const [imageList, setImageList] = useState([]);

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

  // Getting signedUrl from S3 for the trinket's image
  const getImages = () => {
    axios.get(`/api/items/image/${trinket.trinket.image}`).then(response => {
      console.log('response data:', response.data);
      setImageList(response.data);
      console.log('image list:', imageList);
    }).catch(error => {
      console.log('error', error);
      // alert('Something went wrong');
    });
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <li className={ `borrowed-${borrowed} trinket-${trinket.trinket.category}`}>
      <div className='trinket-header'>
        
        { borrowed ? 
          <p><img src=""/>At {borrower.username}'s</p> 
          : 
          <p>at home<EditTrinket trinket={trinket.trinket} imageUrl={imageList.imageUrl}/></p> 
        }
      </div>
      
      <img className="trinket-image" src={`${imageList.imageUrl}`} width="100%"/>
      <div className="trinket-details">
        <h3>{trinket.trinket.name}</h3>
        <p>owner: {trinket.trinket.owner_user_id}</p>
        <p>category: {trinket.trinket.category}</p>
           
      </div>
      
    </li>
  );
}


export default MyTrinketItem;