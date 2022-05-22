import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMembers } from '../features/memberSlice';
import { selectConversations } from '../features/conversationSlice';
import Message, { MsgType } from './Message';
import { updateMember } from '../firebaseUtils/firebaseUtils';
import { selectAuth } from '../features/authSlice';

const MsgBox: React.FC = () => {
  const { id } = useParams();
  const { conversations } = useSelector(selectConversations);
  const { members } = useSelector(selectMembers);
  const { user } = useSelector(selectAuth);
  const dummy = useRef<HTMLDivElement>(null);
  const messages = conversations?.[id as string];
  const roomMembers = members?.[id as string];

  useEffect(() => {
    dummy.current?.scrollIntoView();
    if (!id) return;
    (async () => await updateMember(id))();
  }, [conversations, id]);

  return (
    <main id='msgbox' className='h-[calc(99vh-9rem)] mt-16 overflow-y-auto pt-8'>
      {messages?.length === 0 && <p className='text-center text-gray-200 text-lg'>say Hi 👋 </p>}
      {messages && messages.length > 0 && (
        <ul className='flex flex-col-reverse justify-end gap-4'>
          <div ref={dummy}></div>
          {roomMembers?.[0]?.id !== user.uid && messages[0].owner === user.uid && (
            <div className='w-full flex-between'>
              <hr className='h-[1px] grow mx-8 border-gray-500' />
              <span className='text-gray-300 text-center text-sm'>seen</span>
              <hr className='h-[1px] grow mx-8 border-gray-500' />
            </div>
          )}
          {messages?.map((msg: MsgType) => (
            <Message {...msg} key={msg.id} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default MsgBox;
