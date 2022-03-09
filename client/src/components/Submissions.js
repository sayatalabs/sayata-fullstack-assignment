import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'
import './submission.css'
const SUBMISSIONS_LIST_URL = 'http://localhost:8000/api/submissions'

function GoToPath() {
    let navigate = useNavigate(); 
    const routeChange = () => { 
    let path = "/create"; 
    navigate(path);
    }

    return (
    <div className="app flex-row align-items-center">
        <div>
            <button color="primary" className="new-submission"
            onClick={routeChange}
                >
                NEW SUBMISSION
            </button>
        </div>
    </div>
    );
}

function Submissions() {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const response = await axios.get(SUBMISSIONS_LIST_URL);
        setData(response.data);
    },[]);
        return (
            <div className="App">
                <div>
                    <Navbar />
                </div>
                <Table striped bordered hover responsive>
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Submission ID</th>
                        <th>Company Name</th>
                        <th>Physical Address</th>
                        <th>Status</th>
                        <th>Annual Revenue</th>
                        <th>Signed Application</th>
                    </tr>
                        {data.map((submission,key) => {
                        return(
                            <tr key={submission.submission_id}>
                                <td>{submission.submission_id}</td>
                                <td>{submission.company_name}</td>
                                <td>{submission.physical_address}</td>
                                <td>{submission.status.toUpperCase()}</td>
                                <td>{submission.annual_revenue}$</td>
                                <td>{
                                        submission.application != 'False' ? submission.application: 
                                        <Nav.Item>
                                            <Nav.Link href={"/bind/"+submission.submission_id}>Click Here to Upload</Nav.Link>
                                        </Nav.Item>
                                    }
                                </td>
                            </tr>
                        )}
                    )}
                    </tbody>
                </Table>
                <GoToPath>
                        New Submission
                </GoToPath>
            </div>
        );
      }
export default Submissions;