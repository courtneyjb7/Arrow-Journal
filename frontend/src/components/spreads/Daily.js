import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Journal from "./Journal";
import Header from "../sidebar/Header";
import { FiSmile } from "react-icons/fi";
function Daily(props) {
  const location = useLocation();
  const [pageType, setPageType] = useState("Personal Page");
  const [mood, setMood] = useState(["Good", "green", <FiSmile />]);
  const [tags, setTags] = useState([]);

  return (
    <Box alight="center">
      <Header
        tags={tags}
        setTags={setTags}
        mood={mood}
        setMood={setMood}
        pageType={pageType}
        setPage={setPageType}
        date={location.state.date}
      ></Header>
      <Journal
        pageType={pageType}
        date={location.state.date}
        userName={location.state.name}
        email={location.state.email}
      ></Journal>
    </Box>
  );
}

export default Daily;
