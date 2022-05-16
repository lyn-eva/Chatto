import { useState } from 'react';
import { signInWithEmailAndPassword as SIWEAP } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function useSignInWithEmailAndPassword() {
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithEmailAndPassword = async (email: string, pwd: string) => {
    setLoading(true);
    try {
      return await SIWEAP(auth, email, pwd);
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signInWithEmailAndPassword, loading };
}
