import ChatHeader from '../chat/ChatHeader';
import Input from '../chat/Input';
import MsgBox from '../chat/MsgBox';

const NormalRoom = (props: any) => {
  return (
    <>
      <ChatHeader />
      <MsgBox />
      <Input />
    </>
  );
};

export default NormalRoom;
