import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUserData } from '../custom-hooks/useUserData';
import { selectConversations, ConversationsType } from '../features/conversationSlice';
import { selectAuth } from '../features/authSlice';
import { roomType } from '../features/roomSlice';
import { milliToHHMM } from '../datetime';
import Avatar from '@mui/material/Avatar';
import { MsgType } from '../chat/Message';
import { db } from '../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import Badge from '@mui/material/Badge';

const Conversation: React.FC<roomType> = ({ id, other, owner, updated }) => {
  const [notifications, setNotifications] = useState<number>();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const OTHER = useUserData(other === user?.uid ? owner : other);
  const { conversations } = useSelector(selectConversations) as ConversationsType;

  useEffect(() => {
    if (!user || !conversations) return;
    (async () => {
      const data = await getDoc(doc(db, 'rooms', id, 'members', user.uid));
      const lastActive = data.data()?.lastActive;
      const noti = conversations[id]?.filter(
        (MSG: MsgType) => MSG.sentAt.seconds > lastActive?.seconds && MSG.owner !== user.uid
      ).length;
      setNotifications(noti);
    })();
  }, [id, user, conversations]);

  return (
    <li
      onClick={() => navigate('/p/' + id)}
      className='flex items-center text-white py-2 px-3 hover:bg-gray-700 cursor-pointer rounded-sm'
    >
      <Avatar className='bg-green-400 p-0'>
        {OTHER &&
          (OTHER.photoURL ? (
            <img className='w-full' alt={OTHER.displayName} src={OTHER.photoURL}></img>
          ) : (
            OTHER.displayName?.[0].toUpperCase()
          ))}
      </Avatar>
      <div className='ml-3 grow'>
        <div className='flex-between'>
          <h2 className='font-bold'>{OTHER?.displayName}</h2>
          <span className='text-[12px] tracking-wide text-gray-300 '>
            {milliToHHMM(updated?.seconds)}
          </span>
        </div>
        <div className='flex-between'>
          <p className='text-gray-300 truncate w-10/12 text-[14px]'>
            {conversations?.[id]?.[0]?.msg}
          </p>
          <Badge
            badgeContent={notifications}
            color='primary'
            sx={{ span: { transform: 'translate(0, 0)', position: 'static' } }}
          />
        </div>
      </div>
    </li>
  );
};

export default Conversation;
