// src/components/PumpCommandPanel.js
import React from "react";

const PumpCommandPanel = ({ dispenserId, onSendCommand }) => {
  if (!dispenserId) return null;

  return (
    <div className="bg-light p-2 border-top border-bottom text-center">
      <h5>Controls for Pump {dispenserId}</h5>
      <div className="d-flex justify-content-center flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => onSendCommand("Prepay")}>
          Prepay
        </button>
        <button className="btn btn-warning" onClick={() => onSendCommand("Reserve")}>
          Postpay (Reserve)
        </button>
        <button className="btn btn-info" onClick={() => onSendCommand("Quick $20")}>
          $20 Quick Select
        </button>
        <button className="btn btn-danger" onClick={() => onSendCommand("Clear")}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default PumpCommandPanel;
