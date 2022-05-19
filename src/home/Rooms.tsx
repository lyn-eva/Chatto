import { useSelector } from 'react-redux';
import { selectRooms } from '../features/roomSlice';
import Conversation from './Conversation';

const Rooms: React.FC = () => {
  const { rooms } = useSelector(selectRooms);

  return (
    <main>
      {rooms.map((room) => (
        <Conversation key={room.id} {...room} />
      ))}
    </main>
  );
};

export default Rooms;
