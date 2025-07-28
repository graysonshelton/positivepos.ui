// src/components/AdminPanel.js
import React, { useEffect, useState } from "react";
import {
  fetchCompanies,
  createCompany,
  createLocation,
  createOwnerUser
} from "../api/api";

const AdminPanel = () => {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [locationGuid, setLocationGuid] = useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (err) {
      alert("Error loading companies: " + err.message);
    }
  };

  const handleCreateCompany = async () => {
    try {
      await createCompany({ companyName });
      setCompanyName("");
      loadCompanies();
    } catch (err) {
      alert("Error creating company: " + err.message);
    }
  };

  const handleCreateLocation = async () => {
    try {
      await createLocation({
        companyId: selectedCompanyId,
        locationName,
        locationStatus: "A",
        locationType: "FULL"
      });
      setLocationName("");
    } catch (err) {
      alert("Error creating location: " + err.message);
    }
  };

  const handleCreateUser = async () => {
    try {
      await createOwnerUser({
        email: userEmail,
        role: "Owner",
        password: "Password123!"
      }, locationGuid);
      setUserEmail("");
    } catch (err) {
      alert("Error creating user: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>

      <div className="mb-3">
        <label>Company Name</label>
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="form-control" />
        <button className="btn btn-primary mt-2" onClick={handleCreateCompany}>Create Company</button>
      </div>

      <div className="mb-3">
        <label>Select Company</label>
        <select value={selectedCompanyId} onChange={(e) => setSelectedCompanyId(e.target.value)} className="form-select">
          <option value="">Select...</option>
          {companies.map(c => (
            <option key={c.companyId} value={c.companyId}>{c.companyName}</option>
          ))}
        </select>

        <label className="mt-2">Location Name</label>
        <input value={locationName} onChange={(e) => setLocationName(e.target.value)} className="form-control" />
        <button className="btn btn-success mt-2" onClick={handleCreateLocation}>Create Location</button>
      </div>

      <div className="mb-3">
        <label>User Email (Owner)</label>
        <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="form-control" />
        <label className="mt-2">Location GUID</label>
        <input value={locationGuid} onChange={(e) => setLocationGuid(e.target.value)} className="form-control" />
        <button className="btn btn-info mt-2" onClick={handleCreateUser}>Create Owner User</button>
      </div>
    </div>
  );
};

export default AdminPanel;
