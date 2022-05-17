import { useEffect } from 'react';
import { onSnapshot, collection, query, orderBy, where, WhereFilterOp } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { syncRooms } from '../features/rooms/roomSlice';
import { db } from '../firebaseConfig';
import { syncRoomOptionType } from '../features/rooms/roomTypes';

interface Props {
  children: React.ReactElement;
  options: syncRoomOptionType;
}

const SyncRooms: React.FC<Props> = ({ children, options }) => {
  const { path, where: WHERE, orderBy: ORDERBY } = options;
  const [fieldPath, opStr, value = ''] = WHERE ?? []; // the same as firestore where
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, path), where(fieldPath, opStr, value), orderBy(ORDERBY));

    const unsub = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(syncRooms(rooms));
    });

    return unsub;
  }, [dispatch, options, path]);

  return children;
};

export default SyncRooms;
