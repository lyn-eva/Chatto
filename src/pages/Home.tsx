import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import Header from '../home/Header';
import Rooms from '../home/Rooms';
import RoomOptions from '../home/RoomOptions';
import SyncRooms from '../hoc/SyncRooms';
import { syncRoomOptionType } from '../features/firestore/firestoreTypes';

const Home = () => {
  const { user } = useSelector(selectAuth);
  const roomsConfig: syncRoomOptionType = {
    path: 'rooms',
    where: ['members', 'array-contains', user.uid],
    orderBy: 'updated',
  };

  return (
    <>
      <Header />
      <RoomOptions />
      <SyncRooms options={roomsConfig}>
        <Rooms />
      </SyncRooms>
    </>
  );
};

export default Home;
