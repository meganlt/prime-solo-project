import { create } from "zustand";
import userSlice from './slices/user.slice.js';
import itemSlice from "./slices/item.slice.js";
import communitySlice from "./slices/community.slice.js";

// Combine all slices in the store:
const useStore = create((...args) => ({
  ...userSlice(...args),
  ...itemSlice(...args),
  ...communitySlice(...args)
}))


export default useStore;
