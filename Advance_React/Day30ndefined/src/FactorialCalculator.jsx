import React, { useState, useMemo } from 'react';

function FactorialCalculator() {
  const [number, setNumber] = useState(1);
  const [otherState, setOtherState] = useState(false);

  // Memoized factorial calculation
  const factorial = useMemo(() => {
    console.log('Calculating factorial...');
    const calculateFactorial = (n) => {
      if (n <= 0) return 1;
      return n * calculateFactorial(n - 1);
    };
    return calculateFactorial(number);
  }, [number]); // Only recalculates if "number" changes

  return (
    <div>
      <h2>Factorial Calculator</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <p>Factorial of {number} is: {factorial}</p>

      {/* Some other state */}
      <button onClick={() => setOtherState(!otherState)}>
        Toggle State
      </button>
    </div>
  );
}

export default FactorialCalculator;
