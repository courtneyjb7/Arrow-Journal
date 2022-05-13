import "./App.css";
import { ChakraProvider, Box } from '@chakra-ui/react';
import StartPage from './components/authentication/StartPage.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Monthly from "./components/spreads/Monthly";
import Daily from "./components/spreads/Daily";


function App() {
  return (
    <ChakraProvider>
      <Box>
      <Router>
        <Routes>
          <Route exact path="/" element={<StartPage/>} />
           <Route path="monthly" element={<Monthly />} />
            <Route path="daily" element={<Daily />} />
        </Routes>
      </Router>
      </Box>

    </ChakraProvider>
  );
}

export default App;

