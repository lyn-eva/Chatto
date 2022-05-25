import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import { signOutUser } from '../firebaseUtils/firebaseUtils';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemButton from '@mui/material/ListItemButton';
import Profile from './Profile';

type Active = {
  profileOn: boolean;
  navOn: boolean;
};

type Action = {
  type: 'NAV' | 'PROFILE';
  value?: Active;
};

const reducer = ({ navOn, profileOn }: Active, action: Action) => {
  switch (action.type) {
    case 'NAV':
      return { profileOn: false, navOn: !(navOn && !profileOn) };
    case 'PROFILE':
      return { profileOn: !profileOn, navOn: false };
    default:
      return { profileOn, navOn };
  }
};

const Header = () => {
  const [{ navOn, profileOn }, dispatch] = useReducer(reducer, { navOn: false, profileOn: false });
  const { user } = useSelector(selectAuth);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate('../signin');
  };

  return (
    <header className='relative flex justify-between items-center px-4 py-1 bg-[#555]'>
      <h1 className='font-open-sans font-bold text-orange-500 text-lg'>Chatto</h1>
      <IconButton onClick={() => dispatch({ type: 'NAV' })}>
        <Avatar className='bg-green-400 text-2xl w-12 h-12'>
          {user && user.photoURL ? <img className='w-full' alt='tme' src={user.photoURL}></img> : 'l'}
        </Avatar>
      </IconButton>
      <ul
        className={`${
          navOn
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 pointer-events-none translate-x-[calc(100%+1rem)]'
        } duration-500 absolute right-3 overflow-hidden rounded-[5px] top-[4.5rem] w-48 bg-[#222] shadow-md text-white z-10`}
      >
        <ListItem className='border-b border-[#ffffff80] hover:bg-gray-600'>
          <ListItemButton onClick={() => dispatch({ type: 'PROFILE' })} className='px-0 py-1'>
            <AccountCircleIcon className='mr-5' />
            Profile
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ p: 0 }} className=' border-[#ffffff80] hover:bg-gray-600'>
          <ListItemButton onClick={handleSignOut} component='button' sx={{ py: 1.3 }}>
            <Logout className='mr-5' />
            Log Out
          </ListItemButton>
        </ListItem>
      </ul>
      <Profile active={profileOn} />
    </header>
  );
};

export default Header;
