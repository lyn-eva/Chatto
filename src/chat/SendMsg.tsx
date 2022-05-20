import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import autosize from 'autosize';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import { db } from '../firebaseConfig';
// import { useUserData } from '../custom-hooks/useUserData';
import IconButton from '@mui/material/IconButton';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Paper from '@mui/material/Paper';
import { roomType } from '../features/roomSlice';

interface Props {
  room: roomType;
}

const Input: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useSelector(selectAuth);
  const { id } = useParams();

  useEffect(() => {
    autosize(inputRef.current);
  }, []);

  const handleKeyDown = async (e: any) => {
    if (e.shiftKey && e.key === 'Enter') {
      return autosize.update(inputRef.current);
    }

    if (e.key === 'Enter') {
      const msg = { msg: value.trim(), owner: user.uid, sentAt: serverTimestamp() };
      setValue('');
      if (!value.trim()) return;
      await Promise.all([
        addDoc(collection(db, `rooms/${id}/conversations`), msg),
        updateDoc(doc(db, 'rooms', id as string), { updated: serverTimestamp() }),
      ]);
    }
  };

  return (
    <section className='fixed bottom-4 right-0 w-full px-2 z-50'>
      <Paper component='form' sx={{ display: 'flex', bgcolor: '#0a1929', alignItems: 'center' }}>
        <textarea
          rows={1}
          value={value}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
          style={{
            flexGrow: 1,
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: 18,
            color: '#fff',
            padding: '3px 0 3px 8px',
          }}
        />
        <IconButton type='submit'>
          <SentimentVerySatisfiedIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Paper>
    </section>
  );
};

export default Input;
