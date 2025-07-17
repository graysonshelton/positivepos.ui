// src/components/POSMainScreen.js
import React, { useState } from "react";
import logo from "../assets/petrollive-logo.png";
import CategoryGrid from "./CategoryGrid";
import ReceiptTape from "./ReceiptTape";
import NumberPad from "./NumberPad";
import PumpCommandPanel from "./PumpCommandPanel";
import BottomFuelBar from "./BottomFuelBar";

const initialDispensers = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  status: i % 3 === 0 ? "PREPAY" : "IDLE"
}));

const dispenserStatusClass = (status) => {
  switch (status) {
    case "IDLE": return "bg-success text-white";
    case "IN USE": return "bg-warning text-dark";
    case "PREPAY": return "bg-info text-white";
    case "RESERVED": return "bg-secondary text-white";
    default: return "bg-light text-dark";
  }
};

const POSMainScreen = () => {
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedDispenser, setSelectedDispenser] = useState(null);
  const [dispensers, setDispensers] = useState(initialDispensers);

  const handleKeyPress = (key) => {
    if (key === "C") setAmount("");
    else if (key === "Enter") {} // Enter handling will be context-aware
    else setAmount((prev) => prev + key);
  };

  const handleCategoryClick = (category) => {
    if (!amount) return;
    setTransactions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        category,
        price: parseFloat(amount),
        tax: parseFloat((amount * 0.1).toFixed(2)),
        quantity: 1
      },
    ]);
    setAmount("");
  };

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      {/* Top Bar */}
      <div className="d-flex align-items-center justify-content-start px-4 py-2 bg-dark text-white">
        <img src={logo} alt="PetrolLive Logo" style={{ height: 40 }} className="me-3" />
        <h2 className="mb-0">POSitive POS</h2>
      </div>

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Receipt Tape */}
        <div className="p-2 border-end bg-white" style={{ width: "25%", minWidth: "250px" }}>
          <ReceiptTape transactions={transactions} />
        </div>

        {/* Number Pad */}
        <div style={{ transform: "scale(0.75)", transformOrigin: "top left" }}>
          <NumberPad value={amount} onKeyPress={handleKeyPress} />
        </div>

        {/* Category Grid */}
        <div className="p-3 border-start border-end bg-white flex-grow-1">
          <CategoryGrid onCategoryClick={handleCategoryClick} />
        </div>

        {/* Pumps Always Visible */}
        <div className="p-2 bg-white" style={{ width: "20%" }}>
          <h6 className="text-center">Dispensers</h6>
          <div className="d-flex flex-wrap justify-content-center" style={{ gap: 0 }}>
            {dispensers.map((d) => (
              <div key={d.id} className="text-center m-0 p-0">
                <button
                  className={`btn ${dispenserStatusClass(d.status)} ${selectedDispenser === d.id ? 'border border-dark border-3' : ''}`}
                  style={{ width: 80, height: 80 }}
                  onClick={() => setSelectedDispenser(d.id)}
                >
                  {d.id}<br /><small>{d.status}</small>
                </button>
              </div>
            ))}
          </div>
          {selectedDispenser && (
            <PumpCommandPanel dispenser={selectedDispenser} />
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomFuelBar />
    </div>
  );
};

export default POSMainScreen;
