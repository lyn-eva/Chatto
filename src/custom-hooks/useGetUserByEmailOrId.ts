import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface userType {
  id: string;
  username: string;
  email: string;
}

const useGetUserByEmailOrId = (q: string) => {
  const [user, setUser] = useState<userType|null>();

  useEffect(() => {
    const tmp = async () => {
      const data = await getDoc(doc(db, 'users', q));
      setUser(data.exists() ? { id: data.id, ...data.data() } as userType : null);
    };
    tmp();
  }, [q]);

  return user;
};

export default useGetUserByEmailOrId;
