import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { roomType } from '../features/roomSlice';
import { selectAuth } from '../features/authSlice';
import { selectRooms } from '../features/roomSlice';
import { updateDoc, doc, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { deleteRoom, updateUserRooms } from '../firebaseUtils/firebaseUtils';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { milliToHHMM } from '../datetime';
import { useUserData } from '../custom-hooks/useUserData';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  room: roomType;
}

const ChatHeader: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const { rooms } = useSelector(selectRooms);
  const room = rooms.filter(({ id: ID }) => ID === id)[0];
  const OTHER = useUserData(user.uid === room?.other ? room?.owner : room?.other);
  const [active, setActive] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!OTHER) return;
    setActive(false);
    await Promise.all([
      deleteRoom(id as string),
      updateUserRooms('remove', user.uid, room.id),
      updateUserRooms('remove', OTHER?.id as string, room.id),
      updateDoc(doc(db, 'users', user.uid), { connections: arrayRemove(OTHER?.id) }),
      updateDoc(doc(db, 'users', OTHER?.uid as string), { connections: arrayRemove(user.uid) }),
    ]);
    navigate('../');
  };

  return (
    <header className='flex justify-between items-center px-4 py-2 bg-[#555] fixed top-0 w-full'>
      <button>
        <Avatar className='w-10 h-10 bg-green-400'> L</Avatar>
      </button>
      <div className='ml-5 grow text-white'>
        <h2 className='font-bold leading-4'>{OTHER?.username}</h2>
        <span className='text-sm tracking-wide text-gray-300 block min-h-[16.8px]'>
          {milliToHHMM(room?.updated?.seconds)}
        </span>
      </div>
      <IconButton onClick={() => setActive((prev) => !prev)} sx={{ p: 0 }}>
        <MoreHorizIcon className='text-white' />
      </IconButton>
      <ul
        className={`${
          active ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } duration-500 absolute right-3 origin-top overflow-hidden rounded-[5px] top-[4.5rem] w-48 bg-[#222] shadow-lg text-white z-10`}
      >
        <ListItem sx={{ p: 0 }} className=' border-[#ffffff80] hover:bg-gray-600 z-10'>
          <ListItemButton onClick={handleDelete} component='button' sx={{ py: 1.3 }}>
            <DeleteIcon className='mr-3' />
            Delete room
          </ListItemButton>
        </ListItem>
      </ul>
    </header>
  );
};

export default ChatHeader;
