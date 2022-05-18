import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUserData } from '../custom-hooks/useUserData';
import { selectConversations, Conversations } from '../features/conversationSlice';
import { roomType } from '../features/roomSlice';
import { milliToHHMM } from '../datetime';
import Avatar from '@mui/material/Avatar';


const Conversation: React.FC<roomType> = ({ id, other, owner, type, updated }) => {
  const navigate = useNavigate();
  const user = useUserData(other);
  // const { conversations } = useSelector(selectConversations) as Conversations;


  return (
    <li
      onClick={() => navigate('/p/' + id)}
      className='flex items-center text-white py-2 px-3 hover:bg-gray-700 cursor-pointer rounded-sm'
    >
      <Avatar>{user?.username[0].toUpperCase()}</Avatar>
      <div className='ml-3 grow'>
        <div className='flex-between'>
          <h2 className='font-bold'>{user?.username}</h2>
          <span className='text-[12px] tracking-wide text-gray-300 '>{milliToHHMM(updated?.seconds)}</span>
        </div>
        <p className='text-gray-300 truncate w-10/12 text-[14px]'>{type}</p>
      </div>
    </li>
  );
};

export default Conversation;
