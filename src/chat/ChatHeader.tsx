import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectRooms } from '../features/roomSlice';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { milliToHHMM } from '../datetime';
import { useUserData } from '../custom-hooks/useUserData';

const ChatHeader = () => {
  const { id } = useParams();
  const { rooms } = useSelector(selectRooms);
  const room = rooms.filter(({ id: ID }) => ID === id)[0];
  const user = useUserData(room?.other);

  return (
    <header className='flex justify-between items-center px-4 py-2 bg-[#555] fixed top-0 w-full'>
      <button>
        <Avatar className='w-10 h-10 bg-green-400'> L</Avatar>
      </button>
      <div className='ml-5 grow text-white'>
        <h2 className='font-bold leading-4'>{user?.username}</h2>
        <span className='text-sm tracking-wide text-gray-300 block min-h-[16.8px]'>
          {milliToHHMM(room?.updated?.seconds)}
        </span>
      </div>
      <IconButton sx={{ p: 0 }}>
        <MoreHorizIcon className='text-white' />
      </IconButton>
    </header>
  );
};

export default ChatHeader;
