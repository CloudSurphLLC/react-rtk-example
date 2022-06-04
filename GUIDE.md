# Redux Toolkit (RTK) integration with React


## Installation
1. React Installation

```
npx create-react-app my-app
```

2. Redux toolkit installation

```
npm i redux react-redux @reduxjs/toolkit
```

## Setup
### Reducer setup
1. Create a folder and name it `store` inside `src` directory
2. Create a reducer file `postsSlice.js` inside `store` directory inside `postsSlice.js` file we write our reducer

```javascript
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
```

### Store setup
Setup redux store
1. Create `index.js` file inside `store` folder
```javascript
import {configureStore} from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  }
});
```

### Configure App.js
Now we include store provider in App.js
```javascript
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import PostsPage from 'PostsPage';

export default function App() {
  return (
    <Provider store={store}>
      <PostsPage />
    </Provider>
  );
}
```

### Fetch posts
1. Create a file `PostsPage.js` inside `src/pages` directory
```javascript
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsSelector, fetchPosts } from "../store/postsSlice";

export default function PostsPage() {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector(postsSelector);

  const initialize = useCallback(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => initialize, [initialize]);

  if (loading) {
    return <div>Loading Posts</div>;
  }

  if (error) {
    return <div>Error fetching posts.</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

```