import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Navbar from "./Navbar";  // Updated import
import Hero from "./Hero";      // Assuming you still have Hero component
import Intro from "./Intro";    // Assuming you have Introduction component
import Featuredphotos from "./Featuredphotos"; // Assuming you have Featuredphotos component
import Gallery from "./Gallery"; // Assuming you have Gallery component
import Login from "./Login";
import ClubInfo from "./ClubInfo";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<><Hero /><Intro /><Featuredphotos /></>} /> {/* Default route */}
          <Route path="/home" element={<><Hero /><Intro /><Featuredphotos /></>} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/club_info" element={<ClubInfo />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
