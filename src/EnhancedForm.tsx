// @ts-ignore
import { useCreateUserWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import { auth } from '../firebaseConfig';
// import useValidate from '../custom-hooks/useValidate';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import SnackBar from '@mui/material/Snackbar';

const SignIn = () => {
  // const [createUserWithEmailAndPassword, user, loading, error] =
    // useCreateUserWithEmailAndPassword(auth);
  // const { isValid, email, pwd, emailRef, pwdRef } = useValidate();

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    // if (!isValid()) return;
    // await createUserWithEmailAndPassword(
    //   emailRef.current?.value ?? '',
    //   pwdRef.current?.value || ''
    // );
  };

  return (
    <main className='bg-white h-screen grid items-center '>
      <section className='w-[min(90%,24rem)] mx-auto'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <Typography
            sx={{ mb: 4, fontSize: 25 }}
            className='font-medium text-center'
            component='h2'
          >
            Sign In
          </Typography>

          {/* <TextField
            inputRef={emailRef}
            label='email'
            error={email.invalid}
            helperText={email.err}
          />
          <TextField
            inputRef={pwdRef}
            type='password'
            label='password'
            error={pwd.invalid}
            helperText={pwd.err}
          /> */}
          <Button
            size='large'
            type='submit'
            fullWidth
            className='bg-[#1976d2]'
            variant='contained'
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>
        </form>
        <Link
          to='../signup'
          style={{
            color: '#1565c0',
            marginTop: '1rem',
            display: 'inline-block',
            textAlign: 'center',
            width: '100%',
            textDecoration: 'underline',
          }}
        >
          Don't have an account? Sign Up
        </Link>
      </section>
      {/* <Backdrop open={loading} sx={{ flexDirection: 'column' }}>
        <CircularProgress />
        <Typography marginTop={2}>signing in...</Typography>
      </Backdrop>
      {error && (
        <SnackBar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert severity='error'>{error.message}</Alert>
        </SnackBar>
      )} */}
    </main>
  );
};

export default SignIn;
