import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Paper from '@mui/material/Paper';

const Input = () => {
  return (
    <section className='fixed bottom-4 right-0 w-full px-2 z-50'>
      <Paper sx={{ display: 'flex', bgcolor: '#0a1929' }}>
        <TextField
          fullWidth
          multiline
          size='small'
          placeholder='Message'
          sx={{ textarea: { color: 'white' }, fieldset: { border: 'none' } }}
        />
        <IconButton>
          <SentimentVerySatisfiedIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Paper>
    </section>
  );
};

export default Input;
