import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [title, setTitle] = useState('');
  const [postContent, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://forum.dev/posts/create', {
      title,
      postContent,
    });
    setTitle('');
    setContent('');
  };

  return (
    <div clas="mb-3">
      <form onSubmit={onSubmit}>
        <div class="input-group">
          <span class="input-group-text">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            aria-label="First name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label>Content</label>
          <input
            value={postContent}
            onChange={(e) => setContent(e.target.value)}
            class="form-control"
          />
        </div>
        <button className="btn btn-outline-success">Submit</button>
      </form>
    </div>
  );
};
