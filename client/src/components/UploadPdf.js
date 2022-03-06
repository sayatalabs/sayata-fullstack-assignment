import React, {useState} from 'react';
import axios from 'axios';

function FileUploadPage() {
    const [file, setFile] = useState()

    function handleChange(event) {
      setFile(event.target.files[0])
    }
    
    function handleSubmit(event) {
      event.preventDefault()
      const url = 'http://localhost:8000/api/file-upload';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });
  
    }
    return (
      <div className="application-section">
          <form onSubmit={handleSubmit}>
            <button className="button">
                <input type="file" onChange={handleChange}/>
            </button>
            <button className="button" type="submit">UPLOAD APPLICATION</button>
          </form>
      </div>
    );
}
export default FileUploadPage;