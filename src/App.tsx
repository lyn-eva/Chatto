import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { updateUserRoomLastActive, updateLastActivePerson } from './firebaseUtils/firebaseUtils';
import ListenAuthChange from './hoc/ListenAuthChange';
import ListenToChats from './hoc/ListenToChats';

const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const NormalRoom = lazy(() => import('./pages/NormalRoom'));

function App() {
  const [prevRoomId, setPrevRoomId] = useState<string>();

  const location = useLocation();
  useEffect(() => {
    const roomId = location.pathname.match(/(?<=^\/p\/).+/g)?.[0];
    if (!roomId && !prevRoomId) return;
    if (location.pathname.startsWith('/p/')) setPrevRoomId(roomId);
    (async () => await updateUserRoomLastActive(roomId ?? prevRoomId as string))();
  }, [location, prevRoomId]);

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
