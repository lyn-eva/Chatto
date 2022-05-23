import ChatHeader from '../chat/ChatHeader';
import SendMsg from '../chat/SendMsg';
import MsgBox from '../chat/MsgBox';
const NormalRoom = () => {
  return (
    <>
      <ChatHeader />
      <main className='mx-auto w-[min(90%,900px)]'>
        <MsgBox />
        <SendMsg />
      </main>
    </>
  );
};

export default NormalRoom;
