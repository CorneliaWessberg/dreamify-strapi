import React from "react";
import Header from "./header";
import Footer from "./footer";
import Homepage from "./homepage";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";


export default function RouteApp() {
    return (
        <>
        <Router>
            <Header/>
                <div class="content">
                <Routes>
                    <Route path="/" exact element={<Homepage/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="register" element={<Register/>} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                </div>
            <Footer/>
        </Router>
        </>
    )
}