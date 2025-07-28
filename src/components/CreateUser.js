// src/components/CreateUser.js
import React, { useState } from "react";

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locationGuid, setLocationGuid] = useState("");
  const [role, setRole] = useState("Owner");

  const handleCreate = async () => {
    try {
      const response = await fetch(`https://localhost:5001/api/User/create-owner?locationGuid=${locationGuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      if (!response.ok) throw new Error("Error creating user");

      alert("User created successfully");
      setEmail("");
      setPassword("");
      setLocationGuid("");
    } catch (err) {
      alert("Create failed: " + err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Create Temp User</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control mb-2"
      />
      <input
        type="text"
        placeholder="Location GUID"
        value={locationGuid}
        onChange={(e) => setLocationGuid(e.target.value)}
        className="form-control mb-2"
      />
      <button className="btn btn-success w-100" onClick={handleCreate}>
        Create User
      </button>
    </div>
  );
};

export default CreateUser;
