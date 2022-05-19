import ChatHeader from '../chat/ChatHeader';
import SendMsg from '../chat/SendMsg';
import MsgBox from '../chat/MsgBox';
import { useSelector } from 'react-redux';
import { selectRooms } from '../features/roomSlice';
import { useParams } from 'react-router-dom';

const NormalRoom = () => {
  const { id } = useParams();
  const { rooms } = useSelector(selectRooms);
  const room = rooms.filter(({ id: ID }) => ID === id)[0];

  return (
    <>
      <ChatHeader room={room}/>
      <MsgBox room={room}/>
      <SendMsg room={room}/>
    </>
  );
};

export default NormalRoom;
