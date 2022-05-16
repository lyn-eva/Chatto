import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAuth } from '../features/auth/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface Props {
  children: JSX.Element;
}

const ListenAuthChange: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => dispatch(updateAuth(user)));
    return unsub;
  }, []);

  return children;
};

export default ListenAuthChange;
