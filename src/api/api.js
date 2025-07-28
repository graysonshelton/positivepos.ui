// src/api/api.js
const API_BASE = "https://localhost:5001/api"; // Update this if deployed

export const fetchCompanies = async () => {
  const res = await fetch(`${API_BASE}/Company`);
  if (!res.ok) throw new Error("Failed to load companies");
  return res.json();
};

export const createCompany = async (data) => {
  const res = await fetch(`${API_BASE}/Company`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create company");
  return res.json();
};

export const createLocation = async (data) => {
  const res = await fetch(`${API_BASE}/Location`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create location");
  return res.json();
};

export const createOwnerUser = async (user, locationGuid) => {
  const res = await fetch(`${API_BASE}/User/create-owner?locationGuid=${locationGuid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`https://localhost:5001/api/User/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json(); // { token, email }
};

