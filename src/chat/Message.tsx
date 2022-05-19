import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import { milliToHHMM } from '../datetime';

export interface MsgType {
  msg: string;
  owner: string;
  id: string;
  sentAt: string;
} 


const Message: React.FC<MsgType> = ({ msg, sentAt, owner }) => {
  const { user } = useSelector(selectAuth);
  const isSender = user.uid === owner;

  return (
      <li
        className={`${
          isSender ? 'self-end flex-row-reverse' : 'self-start'
        } px-2 flex items-center gap-2 -z-10 w-full`}
      >
        <div
          style={{
            position: 'static',
            backgroundColor: '#222',
            borderRadius: '3px',
            color: '#fff',
            padding: '12px',
          }}
        >
          {msg}
        </div>
        <span className='text-gray-500 text-[13px]'>{milliToHHMM(sentAt)}</span>
      </li>
  );
};

export default Message;
