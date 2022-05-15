import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFirestore } from '../features/firestore/firestoreSlice';
import { RoomType } from './homeTypes';
import Conversation from './Conversation';

const Rooms: React.FC = () => {
  const { rooms } = useSelector(selectFirestore);
console.log(rooms)
  return (
    <main className='pt-6'>
      {rooms.map((room) => (
        <Conversation {...room}/>
      ))}
    </main>
  );
};

export default Rooms;
