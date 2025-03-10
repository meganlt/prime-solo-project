import axios from 'axios';

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;


const communitySlice = (set, get) => ({
  forestMembers: [],
  fetchForestMembers: async function(){
    // console.log('STORE: in fetchForestMembers');

    try {
      // console.log("TRY: Fetching forest members...");
      const response = await axios.get("/api/community");

      // Checking if data has changed before updating, to limit renders:
      if (JSON.stringify(get().forestMembers) !== JSON.stringify(response.data)) {
        set({ forestMembers: response.data });
      }
    } catch (error) {
      console.error("Error fetching forest members:", error);
    }
  },
  requestList: [],
  fetchUserRequests: (userId)=>{
    // console.log('in fetchRequests', userId);
    axios.get(`/api/requests/${userId}`).then( function(response){
      // console.log('back from GET:', response.data);
      set( {requestList: response.data })
    }).catch( function(err){
      console.log( err );
      alert('error getting users requests');
    })
  }
})


export default communitySlice;
