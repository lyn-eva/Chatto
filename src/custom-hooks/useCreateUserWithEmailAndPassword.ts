import { useState } from 'react';
import { createUserWithEmailAndPassword as CUWENP } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function useCreateUserWithEmailAndPassword() {
  const [loading, setLoading] = useState<boolean>(false);

  const createUserWithEmailAndPassword = async (email: string, pwd: string) => {
    setLoading(true);
    try {
      return await CUWENP(auth, email, pwd);
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createUserWithEmailAndPassword, loading};
}
