import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  children: React.ReactElement;
}

const Veil: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<string|null|User>('unknown');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('../signin');
      setLoggedIn(user);
    });
    return unsub;
  }, [navigate]);

  return loggedIn === 'unknown' ? <CircularProgress /> : children;
};

export default Veil;
