import axios from 'axios';

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;


const itemSlice = (set, get) => ({
  userTrinkets: [],
  fetchUserTrinkets: function(userId) {
    console.log('in fetchUserTrinkets. UserID:', userId);
    axios.get(`/api/items/${userId}`).then( function(response){
      console.log(response.data);
      set( { userTrinkets: response.data } );
    }).catch( function(err){
      console.log(err);
      alert('error getting users trinkets');
    })
  },
  allTrinkets: [],
  fetchAllTrinkets: function() {
    console.log('in fetchAllTrinkets');
  }
})


export default itemSlice;
