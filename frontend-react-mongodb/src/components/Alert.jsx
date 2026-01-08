/**
 * Alert component — shows a bootstrap alert message.
 * Props: { alert: { type, msg } }.
 */
import React from "react";

const Alert = ({ alert }) => {
  return (
    <>
      {alert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>{alert.type}</strong> : {alert.msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
};

export default Alert;
