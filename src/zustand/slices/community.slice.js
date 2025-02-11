import axios from 'axios';

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;


const communitySlice = (set, get) => ({
  forestMembers: [],
  fetchForestMembers: function(){
    console.log('in fetchForestMembers');
    axios.get(`/api/community`).then( function(response){
      console.log(response.data);
      set( { forestMembers: response.data } );
    }).catch( function(err){
      console.log(err);
      alert('error getting forest members');
    })
  }
})


export default communitySlice;
