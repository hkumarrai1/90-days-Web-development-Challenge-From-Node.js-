import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If the modal isn't open, render nothing.

  // Returning the modal using React Portal
  return ReactDOM.createPortal(
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <button onClick={onClose} style={closeButtonStyles}>
          Close
        </button>
        {children} {/* Render any content passed as children */}
      </div>
    </div>,
    document.getElementById("portal-root") // Target DOM node
  );
};

// Inline styles for the modal (just for demonstration)
const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalContentStyles = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  textAlign: "center",
};

const closeButtonStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Modal;
