import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { updateMember } from './firebaseUtils/firebaseUtils';
import ListenAuthChange from './hoc/ListenAuthChange';
import ListenToChats from './hoc/ListenToChats';
import CircularProgress from '@mui/material/CircularProgress';
import Veil from './Veil';

const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const NormalRoom = lazy(() => import('./pages/NormalRoom'));

function App() {
  const [prevRoomId, setPrevRoomId] = useState<string>('');

  const location = useLocation();
  useEffect(() => {
    // update user's room active status after leaving the room
    const roomId = location.pathname.match(/(?<=^\/p\/).+/g)?.[0];
    if (roomId && !prevRoomId) setPrevRoomId(roomId as string);

    return () => {
      if (!prevRoomId) return;
      setPrevRoomId('');
      // callback can't be a promise, so IIFE
      (async () => await updateMember(prevRoomId as string))();
    };
  }, [location, prevRoomId]);

  return (
    <ListenAuthChange>
      <ListenToChats>
        <Suspense
          fallback={
            <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              <CircularProgress />
            </div>
          }
        >
          <Routes>
            <Route
              path='/p/:id'
              element={
                <Veil>
                  <NormalRoom />
                </Veil>
              }
            />
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn />} />
            <Route
              path='/'
              element={
                <Veil>
                  <Home />
                </Veil>
              }
            />
          </Routes>
        </Suspense>
      </ListenToChats>
    </ListenAuthChange>
  );
}

export default App;
