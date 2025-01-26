import React, { useState, Suspense } from "react";
import "./App.css";
import FactorialCalculator from "./FactorialCalculator";
import ParentChildComponent from "./ParentChildComponent";
const Profile = React.lazy(() => import("./Profile"));

function App() {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <>
      <FactorialCalculator></FactorialCalculator>
      <ParentChildComponent />
      <div>
        <h1>Lazy Loading Example</h1>
        <button onClick={() => setShowProfile(true)}>Show Profile</button>

        <Suspense fallback={<div>Loading Profile...</div>}>
          {showProfile && <Profile />}
        </Suspense>
      </div>
    </>
  );
}

export default App;
