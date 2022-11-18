import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './commentCreate';
import CommentList from './CommentList';
import useRequest from '../../hooks/use-request';

export default ({ currentUser }) => {
  const [posts, setPosts] = useState({});
  const { doRequest, errors } = useRequest({
    url: '/posts',
    method: 'get',
    body: {},
    onSuccess: () => console.log('OK'),
  });
  const fetchPosts = async () => {
    const res = await doRequest();
    setPosts(res);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    console.log(currentUser);
    if (currentUser)
      return (
        <div className="row">
          <div className="col-sm-10">
            <div className="card" key={post.postId}>
              <div className="card-body">
                <h5>{post.title}</h5>
                {post.postContent}
                <CommentList comments={post.comment} />
                <CommentCreate postId={post.postId} />
              </div>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="row">
          <div className="col-sm-10">
            <div className="card" key={post.postId}>
              <div className="card-body">
                <h5>{post.title}</h5>
                {post.postContent}
                <CommentList comments={post.comment} />
              </div>
            </div>
          </div>
        </div>
      );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content">
      {renderedPosts}
      {errors}
    </div>
  );
};
