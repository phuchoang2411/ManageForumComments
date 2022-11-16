import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './commentCreate';
import CommentList from './CommentList';

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div class="row">
        <div class="col-sm-10">
          <div class="card" key={post.postId}>
            <div class="card-body">
              <h3>{post.title}</h3>
              <CommentList comments={post.comment} />
              <CommentCreate postId={post.postId} />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content">
      {renderedPosts}
    </div>
  );
};
