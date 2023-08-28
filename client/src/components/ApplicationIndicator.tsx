import { Badge } from "react-bootstrap";

interface Props {
  application: string | boolean;
}

const ApplicationIndicator: React.FC<Props> = ({ application }) => {
  return (
    <Badge bg="secondary">
      {application ? application : ""}
      {""}
      {application === true ? "Yes" : ""}
    </Badge>
  );
};

export default ApplicationIndicator;
