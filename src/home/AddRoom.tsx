import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import { createRoom, searchUser, updateUserRooms } from '../firebaseUtils/firebaseUtils';

interface userType {
  id: string;
  displayName: string;
  email: string;
}

const AddRoom = () => {
  const [result, setResult] = useState<userType | null>();
  const [connections, setConnections] = useState<string[] | null>();
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user: USER } = useSelector(selectAuth);

  const handleSearch = async () => {
    setActive((prev) => !prev);
    if (active || !inputRef.current) return;
    const [data, currentUserData] = await searchUser(inputRef.current.value);

    const res = (
      'empty' in data
        ? data?.empty
          ? null
          : { id: data.docs[0].id, ...data.docs[0].data() }
        : data.exists()
        ? { id: data.id, ...data.data() }
        : null
    ) as userType;

    setResult(res);
    setConnections(currentUserData.data()?.connections);
  };

  const handleCreateRoom = async () => {
    setActive((prev) => !prev);
    if (!result) return;
    const { id: roomId } = await createRoom({
      other: result.id,
      owner: USER.uid,
      members: [result.id, USER.uid],
    });

    await Promise.all([
      updateUserRooms('ADD', USER.uid, result.id, roomId),
      updateUserRooms('ADD', result.id, USER.uid, roomId),
    ]);
  };

  return (
    <Box position='relative'>
      <Box sx={{ display: 'flex', width: '100%', gap: 2, py: 2, px: 1 }}>
        <input
          ref={inputRef}
          placeholder='email or user id'
          style={{ outline: 'none', borderRadius: 3, flexGrow: 1, paddingLeft: 14 }}
        />
        <Button onClick={handleSearch} variant='contained' className='bg-[#1976d2]'>
          Add
        </Button>
      </Box>
      <Paper
        variant='outlined'
        square={false}
        sx={{
          py: 1,
          mx: 1,
          bgcolor: '#fff',
          border: 'none',
          borderRadius: '5px',
          position: 'absolute',
          width: 'calc(100% - 16px)',
          zIndex: 1,
          transition: '300ms',
          transformOrigin: 'top center',
          opacity: active ? 1 : 0,
          pointerEvents: active ? 'auto' : 'none',
          transform: active ? 'scaleY(1)' : 'scaleY(0)',
        }}
      >
        {result ? (
          <div className='flex items-center text-[#374151] py-1 px-3 cursor-pointer'>
            <Avatar>{result.displayName[0].toUpperCase()}</Avatar>
            <h2 className='font-bold grow ml-3'>{result.displayName}</h2>
            {connections?.includes(result.id) ? (
              <p>
                <CheckIcon sx={{ color: '#0f0' }} /> added
              </p>
            ) : USER?.uid === result.id ? (
              <p>
                <CheckIcon sx={{ color: '#0f0' }} /> you
              </p>
            ) : (
              <Button onClick={handleCreateRoom} variant='contained' className='bg-[#1976d2]'>
                Add
              </Button>
            )}
          </div>
        ) : (
          <p style={{ padding: '0 4px', textAlign: 'center' }}>user not found :")</p>
        )}
      </Paper>
    </Box>
  );
};

export default AddRoom;
