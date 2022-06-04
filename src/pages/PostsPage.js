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
