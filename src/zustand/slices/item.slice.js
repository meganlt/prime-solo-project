import axios from 'axios';

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;


const itemSlice = (set, get) => ({
  userTrinkets: [],
  fetchUserTrinkets: async function(userId) {
    console.log('STORE: in fetchUserTrinkets. UserID:', userId);

    try {
      console.log("TRY: Fetching user trinkets for:", userId);
      const response = await axios.get(`/api/items/${userId}`);

      // Checking if data has changed before updating, to limit renders:
      if (JSON.stringify(get().userTrinkets) !== JSON.stringify(response.data)) {
        set({ userTrinkets: response.data });
      }
    } catch (error) {
      console.error("Error fetching trinkets:", error);
    }

    // axios.get(`/api/items/${userId}`).then( function(response){
    //   console.log(response.data);
    //   set( { userTrinkets: response.data } );
    // }).catch( function(err){
    //   console.log(err);
    //   alert('error getting users trinkets');
    // })
  },
  allTrinkets: [],
  fetchAllTrinkets: function() {
    console.log('in fetchAllTrinkets');
  }
})


export default itemSlice;
