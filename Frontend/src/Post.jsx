/* eslint-disable */
import React, {useState} from 'react';

/**
 * @return {object} JSX Table
 */
function Port() {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
      <div>
        <h2>Add Image:</h2>
        <input type='file' onChange={handleChange} />
        <img src={file} />
      </div>
    );
  }
  
  export default Port;