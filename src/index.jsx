import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Entry from "./Pages/Entry";
import Navbar from "./Components/Navbar";
import Articles from "./Pages/Articles";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<Entry />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
