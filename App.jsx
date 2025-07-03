import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateMeme from './pages/CreateMeme';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<CreateMeme />} />
      </Routes>
    </BrowserRouter>
  );
}