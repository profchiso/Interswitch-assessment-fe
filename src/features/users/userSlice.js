import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoggedIn: false,
  userCreationDetails: {
    name: "",
    email: "",
    password: "",
  },
  userLoginDetails: {
    email: "",
    password: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state) => {
      state.value += 1;
    },
    login: (state) => {
      state.value -= 1;
    },
    updateUser: (state) => {
      state.value -= 1;
    },
    getUser: (state) => {
      state.value -= 1;
    },
    getUsers: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createUser, login, updateUser, getUser, getUsers } =
  userSlice.actions;

export default userSlice.reducer;
