import { useState } from 'react';
import { updateProfile as UP, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { updateProfileType } from '../firebaseUtils/firebaseUtilTypes';

export default function useUpdateProfile() {
  const [loading, setLoading] = useState<boolean>(false);

  const updateProfile = async (data: updateProfileType) => {
    setLoading(true);
    try {
      await UP(auth.currentUser as User, data);
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
}
