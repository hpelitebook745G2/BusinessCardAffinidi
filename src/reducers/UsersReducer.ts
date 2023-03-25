import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: [
    {name: 'Earl'},
    {name: 'Fat'},
    {name: 'Grant'},
    {name: 'Riley'},
    {name: 'Tim'},
    {name: 'Lyn'},
  ],
  // users: [],
  currentUser: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {setUsers, setCurrentUser} = usersSlice.actions;

export default usersSlice.reducer;
