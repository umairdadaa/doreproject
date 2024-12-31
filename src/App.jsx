"use client"
import "locomotive-scroll/dist/locomotive-scroll.css";
import ArtistPage from "./Pages/Artist"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContactUs from "./Pages/ContactUs/ContactUs";
import AnnualLadyBug from "./Pages/AnnualLadyBug";
import Timeline from "./Pages/Timeline";
import Home from "./Pages/Home";
import Slider from "./Slider";
import Slideshow3d from "./components/Slideshow3d/Slidershow3d";
import VideoBackgroundPage from "./Pages/VideoBackground";
import Header from "./components/MenuPage";
import Floral from "./Pages/Floral";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/artist" element={<ArtistPage />} />
                <Route path="/menu" element={<Header />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/annual-lady-bug" element={<AnnualLadyBug />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/home" element={<Home />} />
                <Route path="/collection" element={<Slider />} />
                <Route path="/slideShow3d" element={<Slideshow3d />} />
                <Route path="/floral" element={<Floral />} />
                <Route path="/" element={<VideoBackgroundPage />} />
            </Routes>
        </Router>
    )
}


export default App
