import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Nav, Navbar, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { listSubmissionData } from "../api/SubmissionsApi";
import { SubmissionData } from "../api/SubmissionsApi";

const Submissions: React.FC = () => {
  const [data, setData] = useState<SubmissionData[]>([]);
  const navigate = useNavigate();

  const handleClicked = useCallback((e: SubmissionData) => {
    if (e.status === "NEW") {
      navigate(`/bind?id=${e.id}`);
    }
    console.log("clicked", e);
  }, []);

  useEffect(() => {
    const submissions = listSubmissionData();
    submissions
      .then((data) => setData(data))
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  return (
    <div className="mr-4 mx-4">
      <PageHeader />
      <Table striped bordered hover responsive>
        <tbody>
          <tr>
            <th>Submission ID</th>
            <th>Company Name</th>
            <th>Physical Address</th>
            <th>Status</th>
            <th>Annual Revenue</th>
            <th>Signed Application</th>
          </tr>
          {data.map((submission) => {
            return (
              <tr key={submission.id} onClick={() => handleClicked(submission)}>
                <td>{submission.id}</td>
                <td>{submission.companyName}</td>
                <td>{submission.physicalAddress}</td>
                <td>{submission.status.toUpperCase()}</td>
                <td>
                  {"$" +
                    (Math.round(submission.annualRevenue * 100) / 100).toFixed(
                      2
                    )}
                </td>
                <td>
                  {submission.application != null ? (
                    submission.application
                  ) : (
                    <Nav.Item>
                      <Nav.Link href={`/bind?id=${submission.id}`}>
                        <Button variant="outline-info">
                          Click Here to Upload
                        </Button>
                      </Nav.Link>
                    </Nav.Item>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Link to="/new">
          <Button variant="primary" className="mt-2 mb-2 me-2">
            NEW SUBMISSION
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Submissions;
