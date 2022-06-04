import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  posts: [],
  error: null,
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    getPosts: (state) => {
      state.loading = true;
    },
    getPostsSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
      state.error = null;
      console.log(payload);
    },
    getPostsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

const { getPosts, getPostsSuccess, getPostsFailure } = postsSlice.actions;

export function fetchPosts() {
  return (dispatch) => {
    dispatch(getPosts());
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        dispatch(getPostsSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getPostsFailure(error));
      });
  };
}

export const postsSelector = (state) => state.posts;
export default postsSlice.reducer;
