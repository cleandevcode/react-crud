import React from "react";

// Styles
import "./style.scss";

const SimpleTable = ({ rows }) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>
              <span className="column-sort">Name</span>
            </th>
            <th>
              <span className="column-sort">Description</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows && rows.length > 0 ? (
            rows.map((row, idx) => (
              <tr key={idx}>
                <td>{row.name}</td>
                <td>{row.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
