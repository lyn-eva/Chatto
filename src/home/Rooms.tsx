import { useSelector } from 'react-redux';
import { selectRooms } from '../features/roomSlice';
import Conversation from './Conversation';
import SyncConversation from '../hoc/SyncConversation';
import { roomType } from '../features/roomSlice';

const Rooms: React.FC = () => {
  const { rooms } = useSelector(selectRooms);

  return (
    <main>
      {rooms.map((room) => (
        <SyncConversation
          key={room.id}
          options={{
            orderBy: 'sentAt',
            roomId: room.id,
          }}
        >
          <Conversation {...room} />
        </SyncConversation>
      ))}
    </main>
  );
};

export default Rooms;
