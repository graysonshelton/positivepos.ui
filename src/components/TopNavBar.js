// src/components/TopNavBar.js
import React from 'react';
import logo from '../assets/petrollive-logo.png';
import { Link } from 'react-router-dom';

const TopNavBar = ({ user }) => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img src={logo} alt="PetrolLive Logo" style={{ height: 40 }} className="me-2" />
        <strong className="text-primary">PETROL</strong>
        <strong className="text-danger">LIVE</strong>
      </Link>

      <div className="ms-auto d-flex align-items-center">
        {user && (
          <div className="me-3 text-end">
            <div><strong>{user.username}</strong></div>
            <div className="small text-muted">{user.companyName} - {user.locationName}</div>
          </div>
        )}
        <Link to="/logout" className="btn btn-sm btn-outline-secondary">
          Logout
        </Link>
      </div>
    </header>
  );
};

export default TopNavBar;
