import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { Video } from './pages/Video';
import { Shorts } from './pages/Shorts';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" name="Home" element={<Home />} />
                    <Route path="/videos/:id" name="Videos" element={<Video />} />
                    <Route path="/shorts" name="Shorts" element={<Shorts />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
