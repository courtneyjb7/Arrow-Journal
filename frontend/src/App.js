import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monthly from "./components/spreads/Monthly";
import Daily from "./components/spreads/Daily";


function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="monthly" element={<Monthly />} />
            <Route path="daily" element={<Daily />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
