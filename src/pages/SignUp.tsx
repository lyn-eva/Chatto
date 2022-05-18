import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
  setDoc,
} from '../firebaseUtils/firebaseUtils';
import useValidate from '../custom-hooks/useValidate';
import { updateProfileType } from '../firebaseUtils/firebaseUtilTypes';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import SnackBar from '@mui/material/Snackbar';
import { AuthError } from 'firebase/auth';

const SignUp = () => {
  const [err, setErr] = useState<AuthError>();
  const { createUserWithEmailAndPassword, loading } = useCreateUserWithEmailAndPassword();
  const { updateProfile, loading: updateLoading } = useUpdateProfile();
  const { isValid, name, email, pwd, nameRef, emailRef, pwdRef } = useValidate();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    if (!isValid()) return;
    const USERNAME = nameRef.current?.value;
    const EMAIL = emailRef.current?.value;
    const PWD = pwdRef.current?.value;
    try {
      const { user } = await createUserWithEmailAndPassword(EMAIL as string, PWD as string);
      await updateProfile({ displayName: USERNAME } as updateProfileType);
      await setDoc('users', user.uid, { username: USERNAME, email: EMAIL, connections: [] });
      navigate('../');
    } catch (error) {
      setErr(error as AuthError);
    }
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
            Sign Up
          </Typography>
          <TextField
            inputRef={nameRef}
            label='username'
            error={name.invalid}
            helperText={name.err}
          />
          <TextField
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
          />
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
          to='../signin'
          style={{
            color: '#1565c0',
            marginTop: '1rem',
            display: 'inline-block',
            textAlign: 'center',
            width: '100%',
            textDecoration: 'underline',
          }}
        >
          Already have an Account? Sign In
        </Link>
      </section>
      <Backdrop open={loading || updateLoading} sx={{ flexDirection: 'column' }}>
        <CircularProgress />
        <Typography marginTop={2}>Creating your account...</Typography>
      </Backdrop>
      {err && (
        <SnackBar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert severity='error'>{err.message}</Alert>
        </SnackBar>
      )}
    </main>
  );
};

export default SignUp;
