import { useState } from "react";
import { increment, decrement, incrementByValue } from "./CounterFunction";
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const [Memory, setMemory] = useState([]);
  const dispatch = useDispatch();

  const handleMemory = (event) => {
    const buttonName = event.target.name;
    console.log(`${buttonName} was clicked!`);

    switch (buttonName) {
      case "Increment":
        setMemory((prevMemory) => [...prevMemory, `+1`]);
        break;
      case "Decrement":
        setMemory((prevMemory) => [...prevMemory, `-1`]);
        break;
      case "IncrementByValue":
        setMemory((prevMemory) => [...prevMemory, `+5`]);
        break;
      default:
        console.log("Unknown button clicked");
    }
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button
        name="Increment"
        onClick={(event) => {
          dispatch(increment());
          handleMemory(event);
        }}
      >
        Increment
      </button>
      <button
        name="Decrement"
        onClick={(event) => {
          dispatch(decrement());
          handleMemory(event);
        }}
      >
        Decrement
      </button>
      <button
        name="IncrementByValue"
        onClick={(event) => {
          dispatch(incrementByValue(5));
          handleMemory(event);
        }}
      >
        Increment by 5
      </button>
      <div>{Memory.join(",")}</div>
    </div>
  );
};

export default Counter;
