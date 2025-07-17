// src/components/ReceiptTape.js
import React from "react";

const ReceiptTape = ({ transactions }) => {
  const subtotal = transactions.reduce((sum, t) => sum + t.price, 0);
  const tax = transactions.reduce((sum, t) => sum + t.tax, 0);
  const total = subtotal + tax;

  return (
    <div className="px-2 d-flex flex-column justify-content-between h-100" style={{ fontFamily: "monospace", fontSize: "14px", backgroundColor: "#f8f9fa" }}>
      <div>
        <div className="text-center mb-2 border-bottom">RECEIPT</div>
        {transactions.length === 0 ? (
          <div className="text-muted">NO ITEMS</div>
        ) : (
          transactions.map((t, i) => (
            <div key={i}>
              <div>{`MISC - ${t.category.padEnd(10)} $${t.price.toFixed(2)}`}</div>
              <div>{`QTY: ${t.quantity}  TAX: $${t.tax.toFixed(2)}`}</div>
            </div>
          ))
        )}
      </div>
      <div className="border-top pt-2 mt-2">
        <div>{`SUBTOTAL: $${subtotal.toFixed(2)}`}</div>
        <div>{`TAX:      $${tax.toFixed(2)}`}</div>
        <div className="fw-bold">{`TOTAL:    $${total.toFixed(2)}`}</div>
      </div>
     
    </div>
  );
};

export default ReceiptTape;
