import React, { useState } from "react";

const CarouselWithPanZoom = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsPanning(true);
    setStartPanPosition({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPanPosition({ x: e.clientX - startPanPosition.x, y: e.clientY - startPanPosition.y });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setPanPosition({ x: 0, y: 0 }); // Reset pan when zoomed out
    }
  };

  return (
    <div
      className="carousel-inner"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop panning when the mouse leaves the area
    >
      <div className="carousel-item active">
        <div className="zoom-pan-container">
          <img
            src="./images/7.webp"
            className={`w-100 ${isZoomed ? "zoomed" : ""}`}
            alt="Image 1"
            style={{
              height: "400px",
              objectFit: "contain",
              transform: `translate(${panPosition.x}px, ${panPosition.y}px)`,
            }}
            onClick={handleZoomToggle} // Toggle zoom on click
          />
        </div>
      </div>
      {/* Repeat for other carousel items */}
    </div>
  );
};

export default CarouselWithPanZoom;
