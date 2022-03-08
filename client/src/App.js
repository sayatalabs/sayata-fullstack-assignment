import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes,Navigate } from 'react-router-dom';
import Submissions from './components/Submissions';
import CreateSubmission from './components/CreateSubmission';
import BindSubmission from './components/BindSubmission';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Submissions/>}/>
          <Route exact path="/create" element={<CreateSubmission/>}/>
          <Route exact path="/bind/:id" element={<BindSubmission/>}/>
          <Route path='/404' element={<NotFound/>} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    </Router>
  );
}

export default App;
