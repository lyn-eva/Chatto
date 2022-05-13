import { db, auth } from './firebaseConfig';
import { onSnapshot, query, where, orderBy, collection } from 'firebase/firestore';
import { MsgType } from './chat/chatTypes';

export const listenToConversations = async (
  id: string,
  setMessages: React.Dispatch<React.SetStateAction<MsgType[] | null>>
) => {
  const q = query(collection(db, 'rooms', id, 'conversations'), orderBy('created'));
  return onSnapshot(q, (snapshot) =>
    setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as MsgType[])
  );
};
