import { useRef, useState } from 'react';
import {
  doc,
  getDoc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import { db } from '../firebaseConfig';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';

interface userType {
  id: string;
  username: string;
  email: string;
}

const AddRoom = () => {
  const [other, setOther] = useState<userType | null>();
  const [connections, setConnections] = useState<string[] | null>();
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user: USER } = useSelector(selectAuth);

  const handleSearch = async () => {
    setActive((prev) => !prev);
    if (active) return;
    const [data, currentUserData] = await Promise.all([
      getDoc(doc(db, 'users', inputRef.current?.value ?? '')),
      getDoc(doc(db, 'users', USER.uid)),
    ]);
    setOther(data.exists() ? ({ id: data.id, ...data.data() } as userType) : undefined);
    setConnections(currentUserData.data()?.connections);
  };
  // console.log(userRooms);

  const handleCreateRoom = async () => {
    setActive((prev) => !prev);
    if (!other) return;
    const data = {
      other: other.id,
      owner: USER.uid,
      type: 'person',
      members: [other.id, USER.uid],
      created: serverTimestamp(),
      updated: serverTimestamp(),
    };
    await Promise.all([
      addDoc(collection(db, 'rooms'), data),
      updateDoc(doc(db, 'users', USER.uid), {connections: arrayUnion(other.id)}),
      updateDoc(doc(db, 'users', other.id), { connections: arrayUnion(USER.uid) }),
    ]);
  };

  return (
    <Box position='relative'>
      <Box sx={{ display: 'flex', width: '100%', gap: 2, py: 2, px: 1 }}>
        <input
          ref={inputRef}
          placeholder='user id'
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
        {other ? (
          <li className='flex items-center text-[#374151] py-1 px-3 cursor-pointer'>
            <Avatar>{other.username[0].toUpperCase()}</Avatar>
            <h2 className='font-bold grow ml-3'>{other.username}</h2>
            {connections?.includes(other.id) ? (
              <p>
                <CheckIcon sx={{ color: '#0f0' }} />
                added
              </p>
            ) : (
              <Button onClick={handleCreateRoom} variant='contained' className='bg-[#1976d2]'>
                Add
              </Button>
            )}
          </li>
        ) : (
          <p style={{ padding: '0 4px', textAlign: 'center' }}>user not found :")</p>
        )}
      </Paper>
    </Box>
  );
};

export default AddRoom;
