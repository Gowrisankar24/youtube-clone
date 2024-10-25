import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
// import { Home } from './pages/Home';
// import { Video } from './pages/Video';
// import { Shorts } from './pages/Shorts';

export default function App() {
    const HomeCompo = lazy(() => import('./pages/Home'));
    const VideoCompo = lazy(() => import('./pages/Video'));
    const ShortsCompo = lazy(() => import('./pages/Shorts'));
    return (
        <div>
            <BrowserRouter>
                <div>
                    <NavBar />
                </div>
                <main className="h-full min-h-full max-h-full  bg-yt-black">
                    <Suspense fallback={<div>Loading....</div>}>
                        <Routes>
                            <Route path="/" name="Home" element={<HomeCompo />} />
                            <Route path="/videos/:id" name="Videos" element={<VideoCompo />} />
                            <Route
                                path="/shorts/:shortsId"
                                name="Shorts"
                                element={<ShortsCompo />}
                            />
                        </Routes>
                    </Suspense>
                </main>
            </BrowserRouter>
        </div>
    );
}
