import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../features/authSlice';
import { selectRooms } from '../features/roomSlice';
import { deleteRoom, updateUserRooms } from '../firebaseUtils/firebaseUtils';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { milliToHHMM } from '../datetime';
import { useUserData } from '../custom-hooks/useUserData';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChatHeader: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const { rooms } = useSelector(selectRooms);
  const room = rooms.filter(({ id: ID }) => ID === id)[0];
  const other = useUserData(user.uid === room?.other ? room?.owner : room?.other);
  const [active, setActive] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!other) return;
    setActive(false);
    await Promise.all([
      updateUserRooms('REMOVE', user.uid, other.id, room.id),
      updateUserRooms('REMOVE', other.id, user.uid, room.id),
      deleteRoom(id as string),
    ]);
    navigate('../');
  };

  return (
    <header className='flex justify-between items-center px-4 py-2 bg-[#555] fixed top-0 w-full'>
      <IconButton onClick={() => navigate('../')} className='text-white'>
        <ArrowBackIcon />
      </IconButton>
      <IconButton>
        <Avatar className='w-11 h-11 bg-green-400'>
        {other &&
          (other.photoURL ? (
            <img className='w-full' alt={other.displayName} src={other.photoURL}></img>
          ) : (
            other.displayName?.[0].toUpperCase()
          ))}
      </Avatar>
      </IconButton>
      <div className='ml-2 grow text-white'>
        <h2 className='font-bold leading-4 mb-1'>{other?.displayName}</h2>
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
