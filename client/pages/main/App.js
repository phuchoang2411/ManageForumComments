import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

export default () => {
  return (
    <div className="container">
      <h1>Our Forum </h1>
      <div class="row">
        <div class="col-sm">
          <button className="btn btn-outline-danger">Signup</button>
        </div>
        <div class="col-sm">
          <button className="btn btn-outline-warning">Signin</button>
        </div>
        <div class="col-sm">
          <button className="btn btn-outline-secondary">Signout</button>
        </div>
      </div>
      <div class="d-grid gap-3">
        <div class="p-2 bg-light border">
          <h3>Write something</h3>
          <PostCreate />
        </div>
        <div class="p-2 bg-light border">
          <h3>Newsfeed</h3>
          <PostList />
        </div>
      </div>
    </div>
  );
};
