// src/components/BottomFuelBar.js
import React from "react";

const BottomFuelBar = () => {
  return (
    <div
      className="bg-dark text-white text-center py-2 px-3"
      style={{
        width: "100%",
        fontFamily: "monospace",
        fontSize: "14px",
        position: "sticky",
        bottom: 0,
        zIndex: 10,
        borderTop: "2px solid #888"
      }}
    >
      FUEL PRICES — DEF $3.89  |  DIESEL $4.29  |  REEFER $3.99
    </div>
  );
};

export default BottomFuelBar;
