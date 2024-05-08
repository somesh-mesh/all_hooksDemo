// Importing necessary React hooks from 'react' package
import React, { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef } from 'react';

// Initial state for the reducer
const initialState = { count: 0 };

// Reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

// Functional component MyComponent
const MyComponent = () => {
  // useState hook to manage a simple state variable 'count'
  const [count, setCount] = useState(0);
  
  // useReducer hook to manage more complex state logic
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // useState hook to manage a simple state variable 'inputValue'
  const [inputValue, setInputValue] = useState('');
  
  // useRef hook to access a DOM element
  const inputRef = useRef(null);
  
  // useEffect hook to handle side effects when 'count' changes
  useEffect(() => {
    document.title = `You clicked ${count} times`; // Updating document title
    
    // Cleanup function for the effect
    return () => {
      document.title = 'React App'; // Resetting document title
    };
  }, [count]); // Dependency array: effect will re-run only if 'count' changes
  
  // useEffect hook with empty dependency array (similar to componentDidMount)
  useEffect(() => {
    console.log('Component mounted'); // Log when component mounts

    // Cleanup function for unmounting
    return () => {
      console.log('Component unmounted'); // Log when component unmounts
    };
  }, []); // Empty dependency array means this effect runs only once
  
  // Event handler for input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update 'inputValue' state
  };

  // Event handler for incrementing count using reducer
  const handleIncrement = () => {
    dispatch({ type: 'increment' }); // Dispatch action to increment count
  };

  // Event handler for decrementing count using reducer
  const handleDecrement = () => {
    dispatch({ type: 'decrement' }); // Dispatch action to decrement count
  };

  // Event handler to focus on input element
  const handleFocusInput = () => {
    inputRef.current.focus(); // Focus on input element
  };

  // Memoized callback function using useCallback
  const memoizedCallback = useCallback(() => {
    console.log('Memoized callback executed'); // Log when memoized callback is executed
  }, []);

  // Memoized value using useMemo
  const memoizedValue = useMemo(() => {
    return count * 2; // Memoized value: count multiplied by 2
  }, [count]);

  // JSX for rendering the component
  return (
    <div>
      {/* Display current value of 'count' */}
      <h2>Count: {count}</h2>
      
      {/* Buttons to increment and decrement 'count' */}
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      {/* Display current value of 'count' managed by reducer */}
      <h2>Reducer Count: {state.count}</h2>

      {/* Input field to demonstrate useRef */}
      <input type="text" value={inputValue} onChange={handleInputChange} ref={inputRef} />
      <button onClick={handleFocusInput}>Focus Input</button>

      {/* Display memoized value */}
      <h2>Memoized Value: {memoizedValue}</h2>

      {/* Button to execute memoized callback */}
      <button onClick={memoizedCallback}>Memoized Callback</button>
    </div>
  );
};

// Exporting MyComponent as default
export default MyComponent;
