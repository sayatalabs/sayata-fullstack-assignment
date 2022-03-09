import React, { Component } from 'react';
import './createSubmission.css'
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

            
const NEW_SUBMISSION_REQUEST = 'http://localhost:8000/api/create';

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

class CreateSubmission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submission: {
                companyName: props.companyName,
                annualRevenue: props.annualRevenue,
                address: props.address
            }
        };
    }
    
    handleCompanyNameChanged(event) {
        var submission = this.state.submission;
        submission.companyName  = event.target.value;
        this.setState({ submission: submission });
    }

    handleAnnualRevenueChanged(event) {
        var submission = this.state.submission;
        submission.annualRevenue = event.target.value;
        this.setState({ submission: submission });
    }

    handleAddressChanged(event) {
        var submission = this.state.submission;
        submission.address = event.target.value;
        this.setState({ submission: submission });
    }

    handleButtonClicked() {
        console.log(this.state.submission);
        axios.post(NEW_SUBMISSION_REQUEST,this.state.submission,{ mode: 'cors' })
        .then(response => this.setState({submissionId: response.data.id}))
        .then(alert('Submission Saved!'))
    }
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="form"> 
                    <div className='headline'>
                        <h2 className='headline-text'>Basic information</h2>
                    </div>
                    <div>
                        <p className="fill-text">Please Fill the Following Fields</p>
                    </div>
                    <div className="border">
                        <div className="fields">
                            <label className="labels">Company Name</label>
                                <input className="input-fields" type="text" value={this.state.submission.companyName} onChange={this.handleCompanyNameChanged.bind(this)}/>
                            <br/>
                            <label className="labels">
                            Annual Revenue
                            </label >
                                <input className="input-fields" type="text" value={this.state.submission.annualRevenue} onChange={this.handleAnnualRevenueChanged.bind(this)}/>
                            <br/>
                            <label className="labels">
                            Physical Address
                            </label>
                                <input className="input-fields" type="text" value={this.state.submission.address} onChange={this.handleAddressChanged.bind(this)}/>
                        </div>
                    </div>
                </div>
                <div className="buttons-div">
                    <button className='button' onClick={this.handleButtonClicked.bind(this)}> Save and Continue</button>
                    <GoBack>Back</GoBack>
                </div>
            </div>
          )
    }
}
export default CreateSubmission;