import "bootstrap/dist/css/bootstrap.min.css";
import Submissions from "./pages/Submissions";
import { Navigate, Route, Routes } from "react-router-dom";
import NewSubmission from "./pages/NewSubmission";
import BindSubmission, { SubmissionData } from "./pages/BindSubmission";
import { useState } from "react";

const testData: SubmissionData = {
  id: "123",
  companyName: "Any comp",
  address: "Hi there, cal, usa",
  annualRevenues: "$1,000",
};

function App() {
  const [data, setData] = useState<SubmissionData>({
    id: "",
    companyName: "",
    address: "",
    annualRevenues: "",
  });

  return (
    <Routes>
      <Route path="/" element={<Submissions />} />
      <Route path="/bind" element={<BindSubmission />} />
      <Route path="/new" element={<NewSubmission />} />
      {/* <Route path="/test" element={<NavBar />} /> */}
      <Route path="/:id">
        <Route index element={<h1>Show</h1>} />
        <Route path="edit" element={<h1>Edit</h1>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
