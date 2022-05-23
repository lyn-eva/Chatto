import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

type Props = { active: boolean };

const Profile: React.FC<Props> = ({ active }) => {
  const { user } = useSelector(selectAuth);
  console.log(user);

  return (
    <div
      className={`${
        active
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 pointer-events-none translate-x-[calc(100%+2rem)]'
      } duration-500 absolute right-3 p-4 overflow-hidden rounded-[5px] top-[4.5rem] w-[min(90%,22rem)] bg-[#222] shadow-md text-white z-10`}
    >
      <div className='flex-between'>
        <IconButton className='w-[40%] aspect-square'>
          <Avatar className='w-full h-full bg-green-400 text-5xl p-0'>
            <img
              className='w-full'
              alt='tme'
              src='https://cdn.discordapp.com/avatars/900400541899825202/4f4fa7b29d2f6174f60de35fd1ade6a0.webp?size=100'
            ></img>
          </Avatar>
        </IconButton>
        <div className='mr-3'>
          <h1 className='mb-3'>
            <span className='text-gray-200'>username: </span>
            {user.displayName}
          </h1>
          <p>
            <span className='text-gray-200'>joined:</span> 12/23/2022
          </p>
        </div>
      </div>
      <div className='my-6'>
        <div className='flex mb-3 gap-3 h-8'>
          <IconButton className='p-0'>
            <EditIcon className='text-white' />
          </IconButton>
          <input
            className='grow px-2 rounded-sm outline-none text-black'
            type='text'
            placeholder='profile photo link'
          />
        </div>
        <div className='flex gap-3 h-8'>
          <IconButton className='p-0'>
            <EditIcon className='text-white' />
          </IconButton>
          <input
            className='grow px-2 rounded-sm outline-none text-black'
            type='text'
            placeholder='username'
          />
        </div>
      </div>
      <div className='flex-between my-3'>
        <hr className='h-[1px] grow mx-2 border-gray-400' />
        <span className='text-sm text-red-500'>danger zone</span>
        <hr className='h-[1px] grow mx-2 border-gray-400' />
      </div>
      <div>
        <Button fullWidth variant='contained' className='bg-blue-500 hover:bg-blue-700 mb-2'>
          update
        </Button>
        <Button fullWidth variant='contained' className='bg-red-600 hover:bg-red-700'>
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Profile;
