import "./App.css";
import SignUp from './components/profile/SignUp.js';
import Login from './components/profile/Login.js';
import Profile from './components/profile/Profile.js';
import { ChakraProvider } from "@chakra-ui/react";
import StartPage from './components/authentication/StartPage.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Monthly from "./components/spreads/Monthly";
import Daily from "./components/spreads/Daily";

function App() {
  return (
    <ChakraProvider>
      <Router>
          <Routes>
          <Route path="/" element={<StartPage />}>
            <Route path="monthly" element={<Monthly />} />
            <Route path="daily" element={<Daily />} />
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile name='BJ Klingenberg' email='bklingen@calpoly.edu' />}/>
          </Route>
           
          </Routes>
        </Router>
    </ChakraProvider>
  );
}

export default App;

