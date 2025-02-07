import axios from 'axios';

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;


const itemSlice = (set, get) => ({
  trinkets: {},
  fetchTrinkets: async () => {
    //  Retrieves the current user's data from the /api/user endpoint.
    try {
      const { data } = await axios.get('/api/items');
      set({ trinkets: data });
      console.log(data);
    } catch (err) {
      console.log('fetchUser error:', err);
      set({trinkets : {}});
    }
  }
})


export default itemSlice;
