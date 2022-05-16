import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListenAuthChange from './hoc/ListenAuthChange';

const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const PrivateChat = lazy(() => import('./pages/NormalRoom'));

function App() {
  return (
    <ListenAuthChange>
      <Suspense fallback={<p>loading ..</p>}>
        <Routes>
          <Route path='/p/:id' element={<PrivateChat />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Suspense>
    </ListenAuthChange>
  );
}

export default App;
