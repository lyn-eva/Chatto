import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectConversations } from '../features/conversationSlice';
import Message, { MsgType } from './Message';
import { roomType } from '../features/roomSlice';

interface Props {
  room: roomType
}

const MsgBox: React.FC<Props> = () => {
  const { id } = useParams();
  const { conversations } = useSelector(selectConversations);
  const dummy = useRef<HTMLDivElement>(null);
  const messages = conversations?.[id as string];
  console.log('firsmt', messages)

  useEffect(() => {
    dummy.current?.scrollIntoView();
  }, [conversations]);

  return (
    <main className='h-[calc(99vh-8rem)] mt-16 overflow-y-auto py-8'>
      {messages?.length > 1 ? (
        <ul className='flex flex-col justify-end gap-4'>
          {messages?.map((msg: MsgType) => (
            <Message {...msg} key={msg.id} />
          ))}
          <div ref={dummy}></div>
        </ul>
      ) : (
        <p className='text-center text-gray-200 text-lg'>say Hi 👋 </p>
      )}
    </main>
  );
};

export default MsgBox;
