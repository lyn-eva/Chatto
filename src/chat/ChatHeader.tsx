import React from 'react';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const ChatHeader = () => {
  return (
    <header className='flex justify-between items-center px-4 py-2 bg-[#555] fixed top-0 w-full'>
      <button>
        <Avatar className='w-10 h-10 bg-green-400'> L</Avatar>
      </button>
      <div className='ml-5 grow text-white'>
        <h2 className='font-bold leading-4'>{'Xling Xlan'}</h2>
        <span className='text-sm tracking-wide text-gray-300'>{'3:39 AM'}</span>
      </div>
      <IconButton sx={{ p: 0 }}>
        <MoreHorizIcon className='text-white' />
      </IconButton>
    </header>
  );
};

export default ChatHeader;
