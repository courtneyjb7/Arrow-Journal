import React from "react";
import { useLocation } from "react-router-dom";

function Daily(props) {
  const location = useLocation();

  return (
    <div>
      <h1>Date: {location.state.date.toString()}</h1>
    </div>
  );
}

export default Daily;
