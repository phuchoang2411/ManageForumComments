import React, { useState } from 'react';
import axios from 'axios';
import useRequest from '../../hooks/use-request';

export default () => {
  const [title, setTitle] = useState('');
  const [postContent, setContent] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/posts/create',
    method: 'post',
    body: {
      title,
      postContent,
    },
    onSuccess: () => console.log('OK'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
    setTitle('');
    setContent('');
  };

  return (
    <div clas="mb-3">
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <span className="input-group-text">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            aria-label="First name"
            class="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Content</label>
          <input
            value={postContent}
            onChange={(e) => setContent(e.target.value)}
            class="form-control"
          />
        </div>
        {errors}
        <button className="btn btn-outline-success">Submit</button>
      </form>
    </div>
  );
};
