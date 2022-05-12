import React from 'react';
import Avatar from '@mui/material/Avatar';

const Header = () => {
  return (
    <header className='flex justify-between items-center px-4 py-2 bg-[#555]'>
      <p className='font-open-sans font-bold text-orange-500'>Chatto</p>
      <button>
        <Avatar className='w-8 h-8 bg-green-400'> L</Avatar>
      </button>
    </header>
  );
};

export default Header;
