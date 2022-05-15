import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

interface userDataType {
  id: string;
  [key: string]: string;
}

export const useUserData = (id: string) => {
  const [userData, setUserData] = useState<userDataType | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getDoc(doc(db, 'users', id));
      setUserData({ id: data.id, ...data.data() });
    })();
  }, []);

  return userData;
};
