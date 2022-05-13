import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { RoomType } from './homeTypes';
import { db } from '../firebaseConfig';
import Member from './Conversation';

// const members: MemberType[] = [
//   {
//     id: 1,
//     username: '依娜',
//     lastActive: '7:28 AM',
//     msg: 'Organic foreground Graphical User Interface',
//   },
//   {
//     id: 2,
//     username: '璟雯',
//     lastActive: '4:58 AM',
//     msg: 'Programmable directional support',
//   },
//   {
//     id: 3,
//     username: '亦涵',
//     lastActive: '2:24 AM',
//     msg: 'Polarised systematic policy',
//   },
//   {
//     id: 4,
//     username: '思宏',
//     lastActive: '4:01 PM',
//     msg: 'Cloned fault-tolerant process improvement',
//   },
//   {
//     id: 5,
//     username: '玺越',
//     lastActive: '3:07 PM',
//     msg: 'Intuitive encompassing task-force',
//   },
// ];

const Lobby: React.FC = () => {
  const [rooms, setRooms] = useState<RoomType[] | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'rooms'),
      where('members', 'array-contains', 'owner_id'),
      orderBy('updated')
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as RoomType[]);
    });

    return unsub;
  }, []);

  return (
    <main className='pt-6'>
      {rooms?.map((room) => (
        <Member {...room} key={room.id} />
      ))}
    </main>
  );
};

export default Lobby;
