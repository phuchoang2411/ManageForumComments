import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errorsTemp, setErrors] = useState(null);

  const storeTemp = async () => {
    try {
      console.log(url);
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        console.log(response.data);
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(err.toString());
      if (err.response.data.errors)
        setErrors(
          <div className="alert alert-danger">
            <h4>Ooops...</h4>
            <ul className="my-0">
              {err.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return { storeTemp, errorsTemp };
};
