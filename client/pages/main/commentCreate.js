import React, { useState } from 'react';
import useRequest from '../../hooks/use-request';
import storeOnTemporaryDB from '../../hooks/storeOnTemporaryDB';

export default ({ postId }) => {
  const [content, setContent] = useState('');
  const mainServer = `/posts/${postId}/comments`;
  const temporaryServer = `/posts/${postId}/temp`;
  let check;
  const { doRequest, errors } = useRequest({
    url: mainServer,
    method: 'post',
    body: {
      content,
    },
    onSuccess: () => (check = true),
  });

  const { storeTemp, errorsTemp } = storeOnTemporaryDB({
    url: temporaryServer,
    method: 'post',
    body: {
      content,
    },
    onSuccess: () => console.log('OK'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    check = false;
    await doRequest();
    console.log(check);
    if (check == false) await storeTemp();
    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <div className="mb-3">
            <h6>Leave your comment</h6>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              class="form-control"
            />
          </div>
        </div>
        {errors}
        {errorsTemp}
        <button className="btn btn-outline-success">Submit</button>
      </form>
    </div>
  );
};
