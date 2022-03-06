import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Submissions from './components/Submissions'
import CreateSubmission from './components/CreateSubmission';
import Bind from './components/BindSubmission'
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Submissions/>}/>
          <Route exact path="/create" element={<CreateSubmission/>}/>
          <Route exact path="/bound/:id" element={<Bind/>}/>
        </Routes>
    </Router>
  );
}

export default App;
