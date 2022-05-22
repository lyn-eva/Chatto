import {
  setDoc as setDOC,
  getDocs as getDOCS,
  collection,
  doc,
  deleteDoc,
  writeBatch,
  updateDoc,
  serverTimestamp,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { signOut as signOUT } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

export interface updateProfileType {
  displayName: string;
}

export const setDoc = async (path: string, id: string, data: {}) => setDOC(doc(db, path, id), data);

export const getDocs = async (path: string) => getDOCS(collection(db, path));

export const getUserByEmailOrId = async (path: string) => getDOCS(collection(db, path));

export const signOutUser = async () => signOUT(auth);

export const updateLastActive = async (uid: string) =>
  setDOC(doc(db, 'users', uid), { lastActive: serverTimestamp() }, { merge: true });

export const updateUserRooms = async (type: 'ADD' | 'REMOVE', uid: string, otherId: string, roomId: string) => {
  return type === 'ADD'
    ? Promise.all([
        setDOC(doc(db, 'users', uid as string), { rooms: arrayUnion(roomId) }, { merge: true }),
        setDOC(doc(db, 'users', uid as string), { connections: arrayUnion(otherId) }, { merge: true }),
      ])
    : Promise.all([
      deleteDoc(doc(db, 'users', uid, 'rooms', roomId)),
      deleteDoc(doc(db, 'users', uid, 'rooms', roomId)),
    ]);
};

export const updateMember = async (roomId: string) => {
  if (!auth.currentUser) return;
  setDOC(
    doc(db, 'rooms', roomId, 'members', auth.currentUser.uid),
    { lastActive: serverTimestamp() },
    { merge: true }
  );
};

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
