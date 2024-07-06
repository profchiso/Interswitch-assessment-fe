import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],

  postCreationDetails: {
    title: "",
    body: "",
  },
  postUpdateDetails: {
    title: "",
    body: "",
  },
  postDeleteDetails: {
    postId: "",
  },
};

export const postSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createPost: (state) => {
      state.value += 1;
    },

    updatePost: (state) => {
      state.value -= 1;
    },
    getPost: (state) => {
      state.value -= 1;
    },
    getPosts: (state, action) => {
      state.value += action.payload;
    },
    deletePost: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createPost, updatePost, getPost, getPosts, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
