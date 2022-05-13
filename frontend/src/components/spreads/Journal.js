import React, { useState, useEffect } from "react";
import JournalEntry from "./JournalEntry";


function Journal(props) {
  const [entries, setEntries] = useState([]);

  function updateList(entry) {
    setEntries([...entries, entry]);
  }
  const personalPromptTitles = ['Free Write', 'Focus on the Positive!', 'Goals', 'Random Prompt'];
  const personalPromptPlaceholders = ['Write about your day!', 'What were 4 good things that happened today?', 
                                      'Did you work to achieve your goals?', 'What is your favorite color and why?'];
  return (
    <div className="container">
      
      <JournalEntry date={props.date} handleSubmit={updateList} titles={personalPromptTitles} placeholders={personalPromptPlaceholders}/>
    </div>
  );
}

export default Journal;