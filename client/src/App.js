import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

export default () => {
  return (
    <div className="container">
      <h3>Create post</h3>
      <PostCreate />
      <hr />
      <h3>Post list</h3>
      <PostList />
    </div>
  );
};
