import { orderBy } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import ChatHeader from '../chat/ChatHeader';
import Input from '../chat/Input';
import MsgBox from '../chat/MsgBox';
import SyncConversation from '../hoc/SyncConversation';

const NormalRoom = () => {
  const { id } = useParams();

  return (
    <SyncConversation options={{ roomId: id as string, orderBy: 'sentAt' }}>
      <>
        <ChatHeader />
        <MsgBox />
        <Input />
      </>
    </SyncConversation>
  );
};

export default NormalRoom;
