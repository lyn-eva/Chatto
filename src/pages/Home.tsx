import Header from '../home/Header';
import Rooms from '../home/Rooms';
import AddRoom from '../home/AddRoom';

const Home = () => {
  return (
    <>
      <Header />
      <main className='mx-auto w-[min(90%,900px)]'>
        <AddRoom />
        <Rooms />
      </main>
    </>
  );
};

export default Home;
