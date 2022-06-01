import React from 'react';
import './css/Navigation.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Screens

import Auth from '../src/screens/Auth';
import Home from '../src/screens/Home';


function Navigation() {
    return (
        <Router>
            <div className="navigation">
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </Router>

    )
}

export default Navigation