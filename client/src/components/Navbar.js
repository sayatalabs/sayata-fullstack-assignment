import React from 'react';
import {  Link } from "react-router-dom";
import './navbar.css'

const navbar = () =>{
  return (
    <div className="nav-bar-container-light">
      <ul className="middle-items">
        <li className="list-item">
        </li>
      </ul>
      <div id='logo'>
        <img src="./logo.png" alt="bug" />
      </div>
  </div>
  )
}
export default navbar;