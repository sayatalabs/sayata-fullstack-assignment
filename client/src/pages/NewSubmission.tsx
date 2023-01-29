import PageHeader from "../components/PageHeader";
import SubmissionForm from "../components/SubmissionForm";

const NewSubmission: React.FC = () => {
  return (
    <div>
      <PageHeader />
      <h1>Basic Information</h1>
      <SubmissionForm />
    </div>
  );
};

export default NewSubmission;
