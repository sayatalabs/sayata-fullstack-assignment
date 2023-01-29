import { useEffect, useRef, useState } from "react";
import { Row, Col, Card, Button, Stack, Badge, Form } from "react-bootstrap";
import ApplicationIndicator from "../components/ApplicationIndicator";
import PageHeader from "../components/PageHeader";
import {
  getSubmission,
  SubmissionData,
  uploadFile,
} from "./../api/SubmissionsApi";

const BindSubmission: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [submission, setSubmission] = useState<SubmissionData>({
    id: "",
    companyName: "",
    physicalAddress: "",
    status: "",
    annualRevenue: 0,
    application: "",
  });

  const getIdFromUrl = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id") || "";
  };

  const handleUpload = () => {
    inputRef.current?.click();
    const file = inputRef.current?.files?.[0];
    if (file) {
      uploadFile(submission, file);
    }
  };

  useEffect(() => {
    getSubmission(getIdFromUrl())
      .then((res) =>
        setSubmission({
          id: res.id,
          companyName: res.companyName,
          physicalAddress: res.physicalAddress,
          status: res.status,
          annualRevenue: res.annualRevenue,
          application: res.application,
        })
      )
      .catch((err) => console.log(err));
  }, []);

  const keys = Object.keys(submission);
  const width = "50rem";
  return (
    <div className="mx-4">
      <PageHeader />
      <div>Bind Submission</div>
      <div>
        PLEASE REVIEW THE SUBMISSION DETAILS AND UPLOAD A SIGNED APPLICATION
      </div>
      {keys.map((key) => (
        <Row key={key} style={{ width: width }}>
          <Col>
            {key
              .replace(
                /(^|[^A-Z])([A-Z])/g,
                (_, first, letter) => first + " " + letter
              )
              .replace(/^./, function (str) {
                return str.toUpperCase();
              })}
          </Col>
          <Col>{submission[key]}</Col>
        </Row>
      ))}
      <Row>
        <Card style={{ width: width }}>
          <div className="bg-secondary bg-gradient">
            <Card.Title>Upload Signed Application</Card.Title>
            <Card.Subtitle>
              Click on the button below to upload the signed application
            </Card.Subtitle>
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div className="m-3">
                  <input ref={inputRef} className="d-none" type="file" />
                  <Button variant="primary" onClick={handleUpload}>
                    UPLOAD APPLICATION
                  </Button>
                </div>
                <ApplicationIndicator application={submission.application} />
              </Stack>
            </Card.Body>
          </div>
        </Card>
      </Row>
    </div>
  );
};

export default BindSubmission;
