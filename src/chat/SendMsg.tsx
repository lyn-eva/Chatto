import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import autosize from 'autosize';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import IconButton from '@mui/material/IconButton';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Paper from '@mui/material/Paper';
import { sendMsg } from '../firebaseUtils/firebaseUtils';

const Input: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useSelector(selectAuth);
  const { id: roomId } = useParams();

  useEffect(() => {
    autosize(inputRef.current);
  }, []);

  const handleKeyDown = async (e: any) => {
    if (e.shiftKey && e.key === 'Enter') {
      return autosize.update(inputRef.current);
    }
    //send message
    if (e.key !== 'Enter' || !roomId || !value.trim()) return;
    setValue('');
    await sendMsg(roomId, { msg: value.trim(), owner: user.uid });
  };

  return (
    <section className='fixed bottom-4 px-2 z-50 mx-auto w-[min(90%,900px)]'>
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
