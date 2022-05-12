import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';

const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
