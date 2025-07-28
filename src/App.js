// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import POSMainScreen from "./components/POSMainScreen";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<POSMainScreen />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
