import { useEffect } from 'react';
import { onSnapshot, collection, query, orderBy, where, WhereFilterOp } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { useAuthState } from 'react-firebase-hooks/auth';
import { syncRooms } from '../features/firestore/firestoreSlice';
import { db, auth } from '../firebaseConfig';
import React from 'react';

interface optionType {
  path: string;
  where: [string, WhereFilterOp, string];
  orderBy: string;
}

const useSyncWithFirestore = (component: React.FC, options: optionType) => {
  const { path, where: WHERE, orderBy: ORDERBY } = options;
  const [fieldPath, opStr, value] = WHERE; // the same as firestore where
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  console.log(user)

  useEffect(() => {
    const q = query(collection(db, path), where(fieldPath, opStr, value), orderBy(ORDERBY));
    const unsub = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(syncRooms(rooms));
    });

    return unsub;
  }, []);

  return component;
};

export default useSyncWithFirestore;
