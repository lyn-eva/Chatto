import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { RoomType } from './homeTypes';

interface Props extends RoomType {
  key: string;
}

const Conversation: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate('/p/' + id.toString())}
      className='flex items-center text-white py-2 px-3 hover:bg-gray-700 cursor-pointer rounded-sm'
    >
      <Avatar>LN</Avatar>
      <div className='ml-3 grow'>
        <div className='flex-between'>
          <h2 className='font-bold'>{'username'}</h2>
          <span className='text-sm tracking-wide'>{'last active'}</span>
        </div>
        <p className='text-gray-300 truncate w-10/12 text-[14px]'>{'msg'}</p>
      </div>
    </li>
  );
};

export default Conversation; 
