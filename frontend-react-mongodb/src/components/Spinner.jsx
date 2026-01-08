/**
 * Spinner — simple loading indicator used across the app.
 * No props; renders a loading image.
 */
import React from "react";

const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-3" src="/loading.gif" alt="loading" />
    </div>
  );
};

export default Spinner;
