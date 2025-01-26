'use client';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from "./Pages/HomePage";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
  );
};

export default App;
