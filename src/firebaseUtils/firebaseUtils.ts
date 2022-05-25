import {
  setDoc as setDOC,
  getDocs as getDOCS,
  getDoc,
  addDoc,
  collection,
  doc,
  deleteDoc,
  writeBatch,
  updateDoc,
  serverTimestamp,
  arrayRemove,
  arrayUnion,
  FieldValue,
} from 'firebase/firestore';
import { signOut as signOUT } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

export interface updateProfileType {
  displayName?: string;
  photoURL?: string;
  email?: string;
}

interface sendMsgType {
  msg: string;
  owner: string;
}

interface createRoomType {
  other: string;
  owner: string;
  members: string[];
}

export const createUserDb = async (id: string, data: updateProfileType) =>
  setDOC(doc(db, 'users', id), data);

export const updateUserDb = async (data: updateProfileType) => {
  if (!auth.currentUser) return;
  setDOC(doc(db, 'users', auth.currentUser.uid), data, { merge: true });
};

export const signOutUser = async () => signOUT(auth);

export const searchUser = async (query: string) => {
  if (!auth.currentUser) return [];
  return Promise.all([
    getDoc(doc(db, 'users', query)),
    getDoc(doc(db, 'users', auth.currentUser.uid)),
  ]);
};

export const updateUserRooms = async (
  type: 'ADD' | 'REMOVE',
  uid: string,
  otherId: string,
  roomId: string
) =>
  type === 'ADD'
    ? Promise.all([
        setDOC(doc(db, 'users', uid as string), { rooms: arrayUnion(roomId) }, { merge: true }),
        setDOC(
          doc(db, 'users', uid as string),
          { connections: arrayUnion(otherId) },
          { merge: true }
        ),
      ])
    : Promise.all([
        deleteDoc(doc(db, 'users', uid, 'rooms', roomId)),
        deleteDoc(doc(db, 'users', uid, 'rooms', roomId)),
      ]);

export const createRoom = async (room: createRoomType) => {
  return addDoc(collection(db, 'rooms'), {
    ...room,
    created: serverTimestamp(),
    updated: serverTimestamp(),
  });
};

export const updateMember = async (roomId: string) => {
  if (!auth.currentUser) return;
  setDOC(
    doc(db, 'rooms', roomId, 'members', auth.currentUser.uid),
    { lastActive: serverTimestamp() },
    { merge: true }
  );
};

export const sendMsg = async (roomId: string, msg: sendMsgType) => {
  return await Promise.all([
    addDoc(collection(db, `rooms/${roomId}/conversations`), { ...msg, sentAt: serverTimestamp() }),
    updateDoc(doc(db, 'rooms', roomId), { updated: serverTimestamp() }),
  ]);
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
