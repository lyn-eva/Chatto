import { setDoc as setDOC, doc } from 'firebase/firestore';
import { signOut as signOUT, User } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
// import {setDocType} from './firebaseUtilTypes';

export const setDoc = async (path: string, id: string, data: {}) => {
  return setDOC(doc(db, path, id), data);
};

export const signOutUser = async () => signOUT(auth);

export { default as useCreateUserWithEmailAndPassword } from '../custom-hooks/useCreateUserWithEmailAndPassword';
export { default as useUpdateProfile } from '../custom-hooks/useUpdateProfile';
