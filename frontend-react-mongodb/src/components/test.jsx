import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const test = () => {

  useEffect(() => {
    
    const collapseElementList = [].slice.call(document.querySelectorAll('.collapse'));
    const collapseList = collapseElementList.map(function (collapseEl) {
      return new window.bootstrap.Collapse(collapseEl, {
        toggle: false
      });
    });
  }, []);

  return (
    <div className="d-flex">
      {/* Toggle Button */}
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebar"
        aria-expanded="false"
        aria-controls="sidebar"
      >
        Toggle Sidebar
      </button>

      {/* Sidebar */}
      <div id="sidebar" className="collapse show d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px" }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <svg className="bi pe-none me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">Sidebar</span>
        </a>
        <hr />
      </div>
    </div>
  );
};

export default test;
