import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface userDataType {
  id: string;
  [key: string]: string;
}

export const useUserData = (id: string) => {
  const [userData, setUserData] = useState<userDataType | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getDoc(doc(db, 'users', id));
      setUserData({ id: data.id, ...data.data() });
    })();
  }, [id]);

  return userData;
};
