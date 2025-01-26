import React, { useState } from "react";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import BuggyComponent from "./BuggyComponent";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>React Portals Example</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>This is a Modal!</h2>
        <p>Rendered using React Portals</p>
      </Modal>

      {/* Error Boundary Example */}
      <div>
        <h1>React Error Boundaries Example</h1>
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
        <p>This part of the app is safe!</p>
      </div>
    </div>
  );
};

export default App;
