import React, { Component } from 'react';
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
            <button color="primary" className="button-back"
            onClick={routeChange}
                >
                Back
            </button>
        </div>
    </div>
    );
}
class Bind extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            submissions: [],
        };
    }
    async componentDidMount() {
        try {
            this.setState({...this.state, isFetching: true});
            var url  = window.location.href;
            var id = url.split('/');
            const GET_SUBMISSION_BY_ID = 'http://localhost:8000/api/submission/' + id[4];
            const response = await axios.get(GET_SUBMISSION_BY_ID);
            this.setState({submissions: response.data, isFetching: false});
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    };
    handleButtonClicked() {
        console.log('FileName:' + this.state.fileName);
        var url  = window.location.href;
        var id = url.split('/');
        const UPLOAD_FILE_URL = 'http://localhost:8000/api/bind-application/' + id[4];
        axios.post(UPLOAD_FILE_URL,this.state.submission,{ mode: 'cors' })
        .then(response => this.setState({submissionId: response.data.id}))
    };
    render() {
        const submissions = this.state.submissions;
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
                                <td>{submissions.submission_id}</td>
                            </tr>
                            <tr>
                                <td>Company Name</td>
                                <td>{submissions.company_name}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{submissions.physical_address}</td>
                            </tr>
                            <tr>
                                <td>Annual Revenue</td>
                                <td>{submissions.annual_revenue}$</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="column-copy">
                        <div className='column-copy-1'>
                            <p>APPLICATION</p>
                            <p className='click-on-the-button'>Click on the button below to upload the sign application</p>
                        </div>
                        <FileUploadPage />
                    </div>
                </div>
                <div className="buttons-div">
                    <GoBack>Back</GoBack>
                    <button className='button' onClick={this.handleButtonClicked.bind(this)}> BIND SUBMISSION</button>
                </div>
            </div>
        )
    }
}

export default Bind;
