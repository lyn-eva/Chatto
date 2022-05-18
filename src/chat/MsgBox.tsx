import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectConversations } from '../features/conversationSlice';
import Message from './Message';
import { MsgType } from './chatTypes';

const MsgBox = () => {
  const { id } = useParams();
  const { conversations } = useSelector(selectConversations);
  const dummy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dummy.current?.scrollIntoView();
  }, [conversations]);

  return (
    <main className='h-[calc(100vh-8rem)] mt-16 overflow-scroll py-8'>
      <ul className='flex flex-col justify-end gap-3'>
        {conversations?.[id as string].map((msg: MsgType) => (
          <Message {...msg} key={msg.id} />
        ))}
        <div ref={dummy}></div>
      </ul>
    </main>
  );
};

export default MsgBox;
