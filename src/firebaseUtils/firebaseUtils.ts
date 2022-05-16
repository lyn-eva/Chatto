import { setDoc as setDOC, getDocs as getDOCS, collection, doc } from 'firebase/firestore';
import { signOut as signOUT, User } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
// import {setDocType} from './firebaseUtilTypes';

export const setDoc = async (path: string, id: string, data: {}) => setDOC(doc(db, path, id), data);

export const getDocs = async (path: string) => getDOCS(collection(db, path));

export const signOutUser = async () => signOUT(auth);

export { default as useCreateUserWithEmailAndPassword } from '../custom-hooks/useCreateUserWithEmailAndPassword';
export { default as useUpdateProfile } from '../custom-hooks/useUpdateProfile';
