import React, { useState, useEffect } from "react";

const products = [
  { name: "DEF", price: 3.89 },
  { name: "DIESEL", price: 4.29 },
  { name: "REEFER", price: 3.99 },
];

const initialDispensers = [
  { id: 1, status: "IDLE" },
  { id: 2, status: "IN USE" },
  { id: 3, status: "PREPAY" },
  { id: 4, status: "RESERVED" },
];

export default function POSMainScreen() {
  const [amount, setAmount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedDispenser, setSelectedDispenser] = useState(null);
  const [dispenserCommands, setDispenserCommands] = useState({});
  const [dispensers, setDispensers] = useState(initialDispensers);
  const [activeField, setActiveField] = useState("amount");

  useEffect(() => {
    const interval = setInterval(() => {
      setDispensers((prev) =>
        prev.map((d) => ({
          ...d,
          status: d.status === "IDLE" ? "IN USE" : "IDLE",
        }))
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (value) => {
    if (value === "C") {
      setAmount("");
    } else if (value === "Enter") {
      if (selectedProduct && amount) {
        const newTransaction = {
          product: selectedProduct,
          amount: parseFloat(amount),
          price: selectedProduct.price,
          total: parseFloat(amount) * selectedProduct.price,
        };
        setTransactions([...transactions, newTransaction]);
        setAmount("");
        setSelectedProduct(null);
      }
    } else {
      setAmount((prev) => prev + value);
    }
  };

  const dispenserStatusColor = (status) => {
    switch (status) {
      case "IDLE": return "bg-success text-white";
      case "IN USE": return "bg-warning text-dark";
      case "PREPAY": return "bg-info text-white";
      case "RESERVED": return "bg-secondary text-white";
      default: return "bg-light";
    }
  };

  const sendPumpCommand = (command) => {
    if (selectedDispenser == null) return;
    setDispenserCommands((prev) => ({
      ...prev,
      [selectedDispenser]: command
    }));
    console.log(`Sent command '${command}' to Pump ${selectedDispenser}`);
  };

  return (
    <div className="container-xl py-4">
      <h1 className="mb-4">POSitive POS Terminal</h1>
      <div className="row">
        {/* Fuel Offerings */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-header">Fuel Prices</div>
            <div className="card-body">
              {products.map((product) => (
                <div key={product.name} className="mb-2">
                  <strong>{product.name}</strong>: ${product.price.toFixed(2)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Number Pad */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-header">Enter Quantity</div>
            <div className="card-body">
              <div className="display-4 text-center mb-3">{amount || "0.00"}</div>
              <div className="row g-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "C", "Enter"].map((key) => (
                  <div className="col-4" key={key}>
                    <button className="btn btn-dark w-100" onClick={() => handleKeyPress(key)}>
                      {key}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-header">Current Order</div>
            <div className="card-body">
              {transactions.length === 0 ? (
                <div className="text-muted">No items yet</div>
              ) : (
                <ul className="list-group">
                  {transactions.map((txn, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                      <div>{txn.product.name} x {txn.amount}</div>
                      <div>${txn.total.toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
              )}
              <hr />
              <h4>
                Total: ${transactions.reduce((sum, t) => sum + t.total, 0).toFixed(2)}
              </h4>
            </div>
          </div>
        </div>

        {/* Dispenser Status */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-header">Dispenser Status</div>
            <div className="card-body">
              <div className="row g-2 mb-3">
                {dispensers.map((dispenser) => (
                  <div className="col-6" key={dispenser.id}>
                    <button
                      className={`btn w-100 ${dispenserStatusColor(dispenser.status)} ${selectedDispenser === dispenser.id ? "border border-dark" : ""}`}
                      onClick={() => setSelectedDispenser(dispenser.id)}
                    >
                      Pump {dispenser.id}<br />{dispenser.status}
                    </button>
                  </div>
                ))}
              </div>
              {selectedDispenser && (
                <div className="text-center">
                  <h6 className="mb-2">Controls for Pump {selectedDispenser}</h6>
                  <div className="btn-group w-100" role="group">
                    <button className="btn btn-outline-secondary" onClick={() => sendPumpCommand("Reserve")}>Reserve</button>
                    <button className="btn btn-outline-danger" onClick={() => sendPumpCommand("Clear")}>Clear</button>
                    <button className="btn btn-outline-primary" onClick={() => sendPumpCommand("Prepay")}>Prepay</button>
                  </div>
                  <div className="mt-2 text-muted small">
                    Last command: {dispenserCommands[selectedDispenser] || "None"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
