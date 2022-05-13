import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className='relative flex justify-between items-center px-4 py-2 bg-[#555]'>
      <h1 className='font-open-sans font-bold text-orange-500 text-lg'>Chatto</h1>
      <IconButton onClick={() => setOpen((prev) => !prev)}>
        <Avatar className='w-8 h-8 bg-green-400'> L</Avatar>
      </IconButton>
      <ul
        className={`${
          open ? 'opacity-100' : 'opacity-0'
        } duration-500 absolute right-3 overflow-hidden rounded-[5px] top-[4.5rem] w-48 bg-[#222] shadow-md text-white`}
      >
        <ListItem className='border-b border-[#ffffff80] hover:bg-gray-600'>
          <NavLink to='/' className='w-full'>
            <AccountCircleIcon className='mr-5' />
            Profile
          </NavLink>
        </ListItem>
        <ListItem className=' border-[#ffffff80] hover:bg-gray-600'>
          <NavLink to='/signup' className='w-full'>
            <Logout className='mr-5' />
            Log Out
          </NavLink>
        </ListItem>
      </ul>
    </header>
  );
};

export default Header;
