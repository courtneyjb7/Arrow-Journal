import React, { useState, useEffect } from "react";
import JournalEntry from "./JournalEntry";

function Journal(props) {
  const [entries, setEntries] = useState([]);
  const [promptTitles, setPromptTitles] = useState([
    "Free Write",
    "Focus on the Positive!",
    "Goals",
    "Free Write",
  ]);
  const [promptPlaceholders, setPromptPlaceholders] = useState([
    "Write about your day!",
    "What were 4 good things that happened today?",
    "Did you work to achieve your goals?",
    "What is your favorite color and why?",
  ]);
  function updateList(entry) {
    setEntries([...entries, entry]);
  }

  useEffect(() => {
    if (props.pageType === "Personal Page") {
      setPromptTitles([
        "Free Write",
        "Focus on the Positive!",
        "Goals",
        "Random Prompt",
      ]);
      setPromptPlaceholders([
        "Write about your day!",
        "What were 4 good things that happened today?",
        "Did you work to achieve your goals?",
        "What is your favorite color and why?",
      ]);
    }
    if (props.pageType === "Work Page") {
      setPromptTitles([
        "Free Write",
        "Focus on the Positive!",
        "Goals",
        "Reflection",
      ]);
      setPromptPlaceholders([
        "Write about your day!",
        "What were 4 good things that happened today?",
        "Did you work to achieve your goals?",
        "How was work?",
      ]);
    }
    if (props.pageType === "Academic Page") {
      setPromptTitles([
        "Free Write",
        "Focus on the Positive!",
        "Goals",
        "Reflection",
      ]);
      setPromptPlaceholders([
        "Write about your day!",
        "What were 4 good things that happened today?",
        "Did you work to achieve your goals?",
        "How was school?",
      ]);
    }
  }, [props.pageType]);

  return (
    <JournalEntry
      date={props.date}
      pageType={props.pageType}
      handleSubmit={updateList}
      titles={promptTitles}
      placeholders={promptPlaceholders}
      name={props.userName}
      email={props.email}
    />
  );
}

export default Journal;
