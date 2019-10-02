// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a property mode
import React, { useEffect, useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory([...history, history[0]]);
      setMode(newMode);
    } else {
      setHistory([...history, newMode]);
      setMode(newMode);
    }
  }
  function back() {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
    }
    setMode(history[history.length - 1]);
  }
  console.log(history);
  return { mode, transition, back };
};

export default useVisualMode;
