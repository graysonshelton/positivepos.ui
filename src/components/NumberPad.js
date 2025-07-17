import React from "react";
import PropTypes from "prop-types";

const NumberPad = ({ value, onKeyPress }) => {
  const keys = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    ".", "0", "C",
    "Enter"
  ];

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-start px-2 py-3"
      style={{ width: "250px", minWidth: "250px", backgroundColor: "#f2f2f2" }}
    >
      <div
        className="w-100 text-center py-2 mb-3"
        style={{
          fontSize: "2rem",
          fontFamily: "monospace",
          border: "1px solid #ccc",
          backgroundColor: "#fff"
        }}
      >
        {value || "0.00"}
      </div>

      <div className="w-100 d-flex flex-wrap justify-content-center" style={{ gap: "8px" }}>
        {keys.map((key) => (
          <button
            key={key}
            className={`btn btn-lg ${
              key === "Enter"
                ? "btn-primary w-100 mt-2"
                : "btn-dark"
            }`}
            style={{
              width: key === "Enter" ? "100%" : "70px",
              height: "70px",
              fontSize: "1.5rem"
            }}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

NumberPad.propTypes = {
  value: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func.isRequired
};

export default NumberPad;
