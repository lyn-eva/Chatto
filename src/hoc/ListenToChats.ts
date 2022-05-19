import React, { useEffect } from 'react';
import { onSnapshot, collection, query, orderBy, where, WhereFilterOp } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import { syncRooms } from '../features/roomSlice';
import { syncConversations } from '../features/conversationSlice';
import { db } from '../firebaseConfig';

interface Props {
  children: React.ReactElement;
}

const listenToConversations = (id: string, dispatch: any) => {
  const q = query(collection(db, 'rooms', id, 'conversations'), orderBy('sentAt'));
  let conversations = [];
  return onSnapshot(q, (snapshot) => {
    conversations = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(syncConversations({ id: id, value: conversations }));
  });
};

const ListenToChats: React.FC<Props> = ({ children }) => {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.uid) return;
    const listeners: any = [];
    const q = query(
      collection(db, 'rooms'),
      where('members', 'array-contains', user.uid),
      orderBy('updated')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(syncRooms(rooms));
      rooms.forEach((room) => listeners.push(listenToConversations(room.id, dispatch)));
    });

    return () => {
      unsub();
      listeners.forEach((listener: any) => listener());
    };
  }, [dispatch, user]);

  return children;
};

export default ListenToChats;
