import {
  setDoc as setDOC,
  getDocs as getDOCS,
  collection,
  doc,
  query,
  deleteDoc,
  writeBatch,
  arrayRemove,
  arrayUnion,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { signOut as signOUT } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

export const setDoc = async (path: string, id: string, data: {}) => setDOC(doc(db, path, id), data);

export const getDocs = async (path: string) => getDOCS(collection(db, path));

export const getUserByEmailOrId = async (path: string) => getDOCS(collection(db, path));

export const signOutUser = async () => signOUT(auth);

export const updateLastActive = async (uid: string) =>
  setDOC(doc(db, 'users', uid), { lastActive: serverTimestamp() }, { merge: true });

export const updateUserRooms = async (type: 'add' | 'remove', userId: string, roomId: string) =>
  deleteDoc(doc(db, 'users', userId, 'rooms', roomId));

// export const updateUserRoomLastActive = async (roomId: string) =>
//   updateDoc(doc(db, 'users', auth.currentUser?.uid as string, 'rooms', roomId), {
//     lastActive: serverTimestamp(),
//   });

// export const updateLastActivePerson = async (roomId: string) =>
//   updateDoc(doc(db, 'rooms', roomId), {
//     lastActivePerson: auth.currentUser?.uid,
//   });

export const updateMember = async (roomId: string) =>
  updateDoc(doc(db, 'rooms', roomId, 'members', auth.currentUser?.uid as string), {
    lastActive: serverTimestamp(),
  });

export const deleteRoom = async (id: string) => {
  const batch = writeBatch(db);
  batch.delete(doc(db, 'rooms', id));
  const [messages, members] = await Promise.all([
    getDOCS(collection(db, 'rooms', id, 'conversations')),
    getDOCS(collection(db, 'rooms', id, 'members')),
  ]);
  messages.docs.forEach((msg) => batch.delete(doc(db, 'rooms', id, 'conversations', msg.id)));
  members.docs.forEach((member) => batch.delete(doc(db, 'rooms', id, 'members', member.id)));
  return batch.commit();
};

export { default as useCreateUserWithEmailAndPassword } from '../custom-hooks/useCreateUserWithEmailAndPassword';
export { default as useUpdateProfile } from '../custom-hooks/useUpdateProfile';
