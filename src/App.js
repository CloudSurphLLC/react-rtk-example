import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

import PostsPage from "./pages/PostsPage";

export default function App() {
  return (
    <Provider store={store}>
      <PostsPage />
    </Provider>
  );
}
