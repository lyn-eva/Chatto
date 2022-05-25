import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import { milliToDate } from '../datetime';
import { useUpdateProfile, updateUserDb } from '../firebaseUtils/firebaseUtils';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { UserMetadata } from 'firebase/auth';

type Props = { active: boolean };

interface metadata extends UserMetadata {
  createdAt: string;
}

const Profile: React.FC<Props> = ({ active }) => {
  const { updateProfile, loading } = useUpdateProfile();
  const { user } = useSelector(selectAuth);

  const metadata = user?.metadata as metadata;
  const urlRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateProfile = async () => {
    if (!urlRef.current || !nameRef.current) return;
    const data = {
      displayName: nameRef.current.value.trim() || user.displayName || '',
      photoURL: urlRef.current.value.trim() || user.photoURL || '',
    };
    urlRef.current.value = '';
    nameRef.current.value = '';
    await Promise.all([updateProfile(data), updateUserDb(data)]);
  };
  
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
            {user && user.photoURL ? <img className='w-full' alt='tme' src={user.photoURL}></img> : 'l'}
          </Avatar>
        </IconButton>
        <div className='mr-3 text-right'>
          <h1 className='mb-3'>
            <span className='text-gray-200'>displayName: </span>
            {user?.displayName}
          </h1>
          <p>
            <span className='text-gray-200'>joined: </span>
            {milliToDate(metadata?.createdAt)}
          </p>
        </div>
      </div>
      <div className='my-6'>
        <div className='flex mb-3 gap-3 h-8'>
          <IconButton className='p-0'>
            <EditIcon className='text-white' />
          </IconButton>
          <input
            ref={urlRef}
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
            ref={nameRef}
            className='grow px-2 rounded-sm outline-none text-black'
            type='text'
            placeholder='displayName'
          />
        </div>
      </div>
      <div className='flex-between my-3'>
        <hr className='h-[1px] grow mx-2 border-gray-400' />
        <span className='text-sm text-red-500'>danger zone</span>
        <hr className='h-[1px] grow mx-2 border-gray-400' />
      </div>
      <div>
        <Button
          onClick={handleUpdateProfile}
          fullWidth
          variant='contained'
          className='bg-blue-500 hover:bg-blue-700 mb-2'
        >
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
