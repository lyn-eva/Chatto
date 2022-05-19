import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAuth } from '../features/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface Props {
  children: JSX.Element;
}

const ListenAuthChange: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(updateAuth(user));
    });
    return unsub
  }, [dispatch]);

  return children;
};

export default ListenAuthChange;
