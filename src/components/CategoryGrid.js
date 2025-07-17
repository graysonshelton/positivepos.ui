// src/components/CategoryGrid.js
import React from "react";

const categories = [
  { code: "4011", name: "TOBACCO", color: "#dc3545" },
  { code: "4025", name: "CANDY", color: "#fd7e14" },
  { code: "4030", name: "SODA", color: "#ffc107" },
  { code: "4040", name: "COFFEE", color: "#20c997" },
  { code: "4050", name: "BEER", color: "#0d6efd" },
  { code: "4060", name: "LOTTERY", color: "#6610f2" },
  { code: "4070", name: "CHIPS", color: "#6f42c1" },
  { code: "4080", name: "WATER", color: "#0dcaf0" },
  { code: "4090", name: "DAIRY", color: "#198754" },
  { code: "4100", name: "BREAD", color: "#343a40" },
  { code: "4110", name: "SNACKS", color: "#f03e3e" },
  { code: "4120", name: "HOT FOOD", color: "#f76707" },
  { code: "4130", name: "FROZEN", color: "#f59f00" },
  { code: "4140", name: "HOUSEHOLD", color: "#12b886" },
  { code: "4150", name: "PERSONAL", color: "#228be6" },
  { code: "4160", name: "PHARMACY", color: "#7048e8" },
  { code: "4170", name: "FUEL ADD", color: "#ae3ec9" },
  { code: "4180", name: "GIFTS", color: "#15aabf" },
  { code: "4190", name: "CLOTHING", color: "#2f9e44" },
  { code: "4200", name: "OTHER", color: "#212529" },
];

const CategoryGrid = ({ onCategoryClick }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {categories.map((cat) => (
        <button
          key={cat.code}
          className="btn text-white m-1"
          style={{ backgroundColor: cat.color, width: "130px", height: "60px" }}
          onClick={() => onCategoryClick(cat.name)}
        >
          {cat.code}<br />{cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
