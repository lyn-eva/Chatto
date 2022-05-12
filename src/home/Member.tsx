import React from 'react';
import Avatar from '@mui/material/Avatar';
import { MemberType } from './homeTypes';

const Member: React.FC<MemberType> = ({ username, lastActive, msg, id }) => {
  return (
    <li className='flex items-center text-white py-2 px-3 hover:bg-gray-700 cursor-pointer rounded-sm'>
      <Avatar>LN</Avatar>
      <div className='ml-3 grow'>
        <div className='flex-between'>
          <h2 className='font-bold'>{username}</h2>
          <span className='text-sm tracking-wide'>{lastActive}</span>
        </div>
        <p className='text-gray-300 truncate w-10/12 text-[14px]'>{msg}</p>
      </div>
    </li>
  );
};

export default Member;
