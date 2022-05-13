import React from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  GridItem
} from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import Journal from "./Journal";

function Daily(props) {
  const location = useLocation();

  return (
    <Journal></Journal>
  );
}

export default Daily;
