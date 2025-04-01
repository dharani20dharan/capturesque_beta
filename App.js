import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Intro from "./Intro";
import Featuredphotos from "./Featuredphotos";
import Gallery from "./Gallery";
import Login from "./Login";
import ClubInfo from "./ClubInfo";
import Footer from "./Footer";
import Contests from "./contests";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<><Hero /><Intro /><Featuredphotos /></>} />
        <Route path="/gallery" element={<Gallery isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/club_info" element={<ClubInfo />} />
        <Route path="/contests" element={<Contests />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;