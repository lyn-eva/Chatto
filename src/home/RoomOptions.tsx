import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getDocs } from '../firebaseUtils/firebaseUtils';
import { doc } from 'firebase/firestore';

interface userType {
  id: string;
  username: string;
  email: string;
}

const RoomOptions = () => {
  const [users, setUsers] = useState<userType[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getDocs('users');
      setUsers(data.docs.map((doc) => ({ id: doc.id, ...doc.data() } as userType)));
    })();
  }, []);

  return (
    <Box sx={{ display: 'flex', width: '100%', gap: 2, py: 2, px: 1 }}>
      <input
        placeholder='example@email.com'
        style={{ outline: 'none', borderRadius: 3, flexGrow: 1, paddingLeft: 14 }}
      />
      <Button variant='contained' className='bg-[#1976d2]'>
        Add
      </Button>
    </Box>
  );
};

export default RoomOptions;
