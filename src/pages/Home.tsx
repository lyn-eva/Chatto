import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import Header from '../home/Header';
import Rooms from '../home/Rooms';
import RoomOptions from '../home/AddRoom';

const Home = () => {
  return (
    <>
      <Header />
      <RoomOptions />
      <Rooms />
    </>
  );
};

export default Home;
