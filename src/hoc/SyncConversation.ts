import { useEffect } from 'react';
import { onSnapshot, collection, query, orderBy, where, WhereFilterOp } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { syncConversations } from '../features/conversations/conversationSlice';
import { db } from '../firebaseConfig';
import { syncConversationOptionType } from '../features/rooms/roomTypes';

interface Props {
  children: React.ReactElement;
  options: syncConversationOptionType;
}

const SyncConversation: React.FC<Props> = ({ children, options }) => {
  const { roomId, orderBy: ORDERBY } = options;
  const dispatch = useDispatch();
  useEffect(() => {
    const q = query(collection(db, 'rooms', roomId, 'conversations'), orderBy(ORDERBY));

    const unsub = onSnapshot(q, (snapshot) => {
      const conversations = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(syncConversations({ id: roomId, value: conversations }));
    });

    return unsub;
  }, [dispatch, options]);

  return children;
};

export default SyncConversation;
