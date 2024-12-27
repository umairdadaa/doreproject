"use client"
import "locomotive-scroll/dist/locomotive-scroll.css";
import ArtistPage from "./Pages/Artist"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContactUs from "./Pages/ContactUs/ContactUs";
import AnnualLadyBug from "./Pages/AnnualLadyBug";
import Timeline from "./Pages/Timeline";
import Home from "./Pages/Home";

// import Timeline from "./Pages/Timeline"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArtistPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/annual-lady-bug" element={<AnnualLadyBug />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App