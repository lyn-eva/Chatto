import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { signOutUser } from '../firebaseUtils/firebaseUtils';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemButton from '@mui/material/ListItemButton';

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate('../signin');
  };

  return (
    <header className='relative flex justify-between items-center px-4 py-2 bg-[#555]'>
      <h1 className='font-open-sans font-bold text-orange-500 text-lg'>Chatto</h1>
      <IconButton onClick={() => setOpen((prev) => !prev)}>
        <Avatar className='w-8 h-8 bg-green-400'> L</Avatar>
      </IconButton>
      <ul
        className={`${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } duration-500 absolute right-3 overflow-hidden rounded-[5px] top-[4.5rem] w-48 bg-[#222] shadow-md text-white`}
      >
        <ListItem className='border-b border-[#ffffff80] hover:bg-gray-600'>
          <NavLink to='/' className='w-full'>
            <AccountCircleIcon className='mr-5' />
            Profile
          </NavLink>
        </ListItem>
        <ListItem sx={{p: 0}} className=' border-[#ffffff80] hover:bg-gray-600'>
          <ListItemButton onClick={handleSignOut} component='button' sx={{py: 1.3}}>
            <Logout className='mr-5' />
            Log Out
          </ListItemButton>
        </ListItem>
      </ul>
    </header>
  );
};

export default Header;
