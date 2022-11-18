import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

export default ({ currentUser }) => {
  return (
    <div className="container">
      <div className="d-grid gap-3">
        <div className="p-2 bg-light border">
          <h3>Write something</h3>
          <PostCreate />
        </div>
        <div className="p-2 bg-light border">
          <h3>Newsfeed</h3>
          <PostList currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};
