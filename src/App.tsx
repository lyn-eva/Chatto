import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';

const Home = lazy(() => import('./pages/Home'));
const PrivateChat = lazy(() => import('./pages/NormalRoom'));

function App() {
  return (
    <Routes>
      <Route path='/p/:id' element={<PrivateChat />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
