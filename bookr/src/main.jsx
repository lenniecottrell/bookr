import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import About from "./pages/About";
import MyLibrary from "./pages/MyLibrary";
import { TokenProvider } from "./hooks/useToken";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TokenProvider>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="library" element={<MyLibrary />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </TokenProvider>
);
