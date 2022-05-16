import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFirestore } from '../features/firestore/firestoreSlice';
import { RoomType } from './homeTypes';
import Conversation from './Conversation';
import SyncConversation from '../hoc/SyncConversation';

const Rooms: React.FC = () => {
  const { rooms } = useSelector(selectFirestore);

  return (
    <main className='pt-6'>
      {rooms.map((room) => (<Conversation {...room}/>
        // <SyncConversation
        //   options={{
        //     orderBy: 'updated',
        //     roomId: room.id,
        //   }}
        // >
        //   <Conversation {...room} />
        // </SyncConversation>
      ))} 
    </main>
  );
};

export default Rooms;
