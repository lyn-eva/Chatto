import React from 'react';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignUp = () => {
  const handleSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
  };

  return (
    <main className='bg-white h-screen grid items-center '>
      <form className='w-[min(90%,18rem)] mx-auto flex flex-col gap-3'>
        <TextField
          variant='outlined'
          size='small'
          label='username'
          fullWidth
          inputProps={{ outline: '2px solid #fff' }}
        />
        <TextField
          variant='outlined'
          size='small'
          label='email'
          fullWidth
          inputProps={{ outline: '2px solid #fff' }}
        />
        <TextField
          variant='outlined'
          size='small'
          label='password'
          fullWidth
          inputProps={{ outline: '2px solid #fff' }}
        />
        <Button
          onSubmit={handleSubmit}
          type='submit'
          variant='contained'
          sx={{ span: { bgcolor: '#1565c0' }, opacity: 1 }}
        >
          SignUp
        </Button>
      </form>
    </main>
  );
};

export default SignUp;
