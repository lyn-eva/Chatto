
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUserData } from '../custom-hooks/useUserData';
import { selectConversations, Conversations } from '../features/conversationSlice';
import { selectAuth } from '../features/authSlice';
import { roomType } from '../features/roomSlice';
import { milliToHHMM } from '../datetime';
import Avatar from '@mui/material/Avatar';

const Conversation: React.FC<roomType> = ({ id, other, owner, updated }) => {
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const OTHER = useUserData(other === user?.uid ? owner : other);
  const { conversations } = useSelector(selectConversations) as Conversations;
  const roomMsgs = conversations?.[id];
console.log(milliToHHMM(updated?.seconds))
  return (
    <li
      onClick={() => navigate('/p/' + id)}
      className='flex items-center text-white py-2 px-3 hover:bg-gray-700 cursor-pointer rounded-sm'
    >
      <Avatar>{OTHER?.username[0].toUpperCase()}</Avatar>
      <div className='ml-3 grow'>
        <div className='flex-between'>
          <h2 className='font-bold'>{OTHER?.username}</h2>
          <span className='text-[12px] tracking-wide text-gray-300 '>
            {milliToHHMM(updated?.seconds)}
          </span>
        </div>
        <p className='text-gray-300 truncate w-10/12 text-[14px]'>{roomMsgs?.[roomMsgs.length -1]?.msg}</p>
      </div>
    </li>
  );
};

export default Conversation;
