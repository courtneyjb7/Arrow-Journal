import React from "react";
import { useLocation } from "react-router-dom";
import Journal from "./Journal";

function Daily(props) {
  const location = useLocation();

  return (
    <Journal date={location.state.date}></Journal>
  );
}

export default Daily;
