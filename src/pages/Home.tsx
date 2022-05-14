import React from 'react';
import Header from '../home/Header';
import Rooms from '../home/Rooms';
import useSyncWithFirestore from '../hoc/useSyncWithFirestore';
import { roomConfigType } from '../features/firestore/firestoreTypes';

const roomsConfig: roomConfigType = {
  path: 'rooms',
  where: ['members', 'array-contains', 'owner_id'],
  orderBy: 'updated',
};

const Home = () => {
  const SyncedRooms = useSyncWithFirestore(Rooms, roomsConfig);

  return (
    <>
      <Header />
      <SyncedRooms />
    </>
  );
};

export default Home;
