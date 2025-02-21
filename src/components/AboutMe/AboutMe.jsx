import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import axios from 'axios';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

function AboutMe() {
  
  const user = useStore((state) => state.user);
  const fetchUser = useStore( (state)=>state.fetchUser);
  // const avatars = ['img/avatar-rabbit.png', 'img/avatar-raccoon.png'];

  function updateAvatar(e){
    e.preventDefault();
    const newImg = 'img/' + e.target.elements.avatar.value + '.png';
    console.log('in updateAvatar', newImg);
    const objectToSend = {
      userId: user.id,
      newAvatar: newImg
    }
    axios.put('/api/user', objectToSend).then( function(response){
      console.log(response.data);
      fetchUser();
    }).catch( function(err){
      console.log(err);
      alert('error updating user info');
    });
  }

  return (
    <>
      <h1>About Me</h1>
      <div className="about-info">
        <img src={user.avatar} alt="avatar preview"/>
        <div><h2>My username:</h2><p>{user.username}</p></div> 
      </div>
      <div>
        <h2>Change Your Avatar:</h2>
        <form onSubmit={updateAvatar}>
          <div className="avatar-container">
            <label className="avatar-label">
              <input type="radio" name="avatar" value="avatar-rabbit" required/>
              <img src="img/avatar-rabbit.png" alt="Avatar1" className="avatar-image"/>

            </label>
            <label className="avatar-label">
                <input type="radio" name="avatar" value="avatar-raccoon" required/>
                <img src="img/avatar-raccoon.png" alt="Avatar2" className="avatar-image"/>

            </label>
            <label className="avatar-label">
                <input type="radio" name="avatar" value="avatar3" required/>
                <img src="img/avatar-rabbit.png" alt="Avatar3" className="avatar-image"/>

            </label>
            <label className="avatar-label">
                <input type="radio" name="avatar" value="avatar4" required/>
                <img src="img/avatar-raccoon.png" alt="Avatar 4" className="avatar-image"/>

            </label>
            <label className="avatar-label">
                <input type="radio" name="avatar" value="avatar5" required/>
                <img src="img/avatar-rabbit.png" alt="Avatar 5" className="avatar-image"/>

            </label>
            <label className="avatar-label">
                <input type="radio" name="avatar" value="avatar6" required/>
                <img src="img/avatar-raccoon.png" alt="Avatar 6" className="avatar-image"/>

            </label>
          </div>
          <button type="submit">Update My Avatar</button>  
        </form>


      </div>

    </>
  );
}


export default AboutMe;