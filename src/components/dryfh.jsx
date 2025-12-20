import React, { useRef } from "react";

function FocusInput() {
  // Create a ref
  const inputRef = useRef(null);

  // Function to focus input
  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Enter text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default FocusInput;
