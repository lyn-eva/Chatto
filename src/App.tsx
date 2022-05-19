import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListenAuthChange from './hoc/ListenAuthChange';
import ListenToChats from './hoc/ListenToChats';

const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const NormalRoom = lazy(() => import('./pages/NormalRoom'));

function App() {
  return (
    <ListenAuthChange>
      <ListenToChats>
        <Suspense fallback={<p>loading ..</p>}>
          <Routes>
            <Route path='/p/:id' element={<NormalRoom />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Suspense>
      </ListenToChats>
    </ListenAuthChange>
  );
}

export default App;
