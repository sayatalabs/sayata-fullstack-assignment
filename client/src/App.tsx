import "bootstrap/dist/css/bootstrap.min.css";
import Submissions from "./pages/Submissions";
import { Navigate, Route, Routes } from "react-router-dom";
import NewSubmission from "./pages/NewSubmission";
import BindSubmission from "./pages/BindSubmission";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Submissions />} />
      <Route path="/bind" element={<BindSubmission />} />
      <Route path="/new" element={<NewSubmission />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
