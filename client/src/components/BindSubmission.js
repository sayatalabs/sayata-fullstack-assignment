import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/esm/Table';
import FileUploadPage from './UploadPdf' 
import './bindSubmission.css'


function GoBack() {
    let navigate = useNavigate(); 
    const routeChange = () => { 
    let path = "/"; 
    navigate(path);
    }
    return (
    <div className="app flex-row align-items-center">
        <div> 
            <button color="primary" className="button-back"onClick={routeChange}>
                Back
            </button>
        </div>
    </div>
    );
}
function BindSubmission() {
    // const  [data,setData] = useState({submissions: []});
    const [data, setData] = useState([]);
    const [fileName,setFileName] = useState(0);
    // const [submission, seSsubmission] = useState();
    
    const getDataFromChild = (fileName) => {
        console.log('PARENT:' + fileName);
        setFileName(fileName);
    }
    useEffect(async () => {
        var url  = window.location.href;
        var id = url.split('/');
        const GET_SUBMISSION_BY_ID = 'http://localhost:8000/api/submission/' + id[4];
        const response = await axios.get(GET_SUBMISSION_BY_ID);
        setData(response.data);
    },[]);

    function handleButtonClicked() {
        console.log('FileName inside handleButtonClicked :' + fileName);
        var url  = window.location.href;
        var id = url.split('/');
        const UPLOAD_FILE_URL = 'http://localhost:8000/api/bind-submission/' + id[4] + '/' + fileName;
        console.log(UPLOAD_FILE_URL);
        axios.get(UPLOAD_FILE_URL,data,{ mode: 'cors' })
        .then(response => setData({submissionId: response.data.id}))
    };
    //const submissions = data;
    return (
        <div>
            <Navbar></Navbar>
            <div className="form"> 
                <div className='headline'>
                    <h2 className='headline-text'>Bind submission</h2>
                </div>
                <div>
                    <p className="fill-text">PLEASE REVIEW THE SUBMISSION DETAILS AND UPLOAD A SIGNED APPLICATION</p>
                </div>
                <Table size="sm">
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Submission ID</td>
                            <td>{data.submission_id}</td>
                        </tr>
                        <tr>
                            <td>Company Name</td>
                            <td>{data.company_name}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{data.physical_address}</td>
                        </tr>
                        <tr>
                            <td>Annual Revenue</td>
                            <td>{data.annual_revenue}$</td>
                        </tr>
                    </tbody>
                </Table>
                <div className="column-copy">
                    <div className="column-copy-1">
                        <p>APPLICATION</p>
                        <p className="click-on-the-button">Click on the button below to upload the sign application</p>
                    </div>
                    <FileUploadPage getDataFromChild={getDataFromChild} />
                </div>
            </div>
            <div className="buttons-div">
                <GoBack>Back</GoBack>
                <button className="button" onClick={handleButtonClicked}> BIND SUBMISSION</button>
            </div>
        </div>
    )
}
export default BindSubmission;
