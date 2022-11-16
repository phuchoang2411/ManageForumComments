import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://posts.com/posts/create', {
      title,
    });
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div class="mb-3">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            class="form-control"
          />
        </div>
        <button className="btn btn-outline-success">Submit</button>
      </form>
    </div>
  );
};
