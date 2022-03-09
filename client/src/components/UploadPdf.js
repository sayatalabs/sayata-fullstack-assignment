import React, {useState} from 'react';
import axios from 'axios';

function FileUploadPage({getDataFromChild}) {
    const [file, setFile] = useState()

    function handleChange(event) {
      setFile(event.target.files[0]);
      getDataFromChild(event.target.files[0].name);
    }
    
    function handleSubmit(event) {
      event.preventDefault()
      const URL_FILE_UPLOAD = 'http://localhost:8000/api/file-upload';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      getDataFromChild(file.name)
      var url  = window.location.href;
      var id = url.split('/');
      formData.append('submissionID', id[4]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post(URL_FILE_UPLOAD, formData, config).then((response) => {
        if (response.status == 200) {
            alert(response.data.message);
        }
        else {
            alert(response.data.message);
        }
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