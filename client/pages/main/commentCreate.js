import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://forum.dev/posts/${postId}/comments`, {
        content,
      });
    } catch (err) {
      await axios.post(`http://forum.dev/posts/${postId}/temp`, {
        content,
      });
    }

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div class="input-group mb-3">
          <div class="mb-3">
            <h6>Leave your comment</h6>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              class="form-control"
            />
          </div>
        </div>
        <button className="btn btn-outline-success">Submit</button>
      </form>
    </div>
  );
};
