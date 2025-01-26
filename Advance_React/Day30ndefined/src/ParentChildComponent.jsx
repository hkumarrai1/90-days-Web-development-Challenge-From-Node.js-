import React, { useState, useCallback } from "react";

// Child Component
const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});

// Parent Component
function ParentChildComponent() {
  const [count, setCount] = useState(0);

  // Memoized callback
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <Child onClick={handleClick} />
    </div>
  );
}

export default ParentChildComponent;
