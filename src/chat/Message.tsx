import React from 'react';
import SnackBar from '@mui/material/Snackbar';
// import { msgTypes } from './ChatTypes';
import { MsgTypes } from './chatTypes';

interface Props extends MsgTypes {
  isOwner: Boolean;
}

const Message: React.FC<Props> = ({ isOwner, msg, sendAt }) => {
  return (
    <li
      className={`${
        isOwner ? 'self-end flex-row-reverse' : 'self-start'
      } px-2 flex items-center gap-2 z-0`}
    >
      <SnackBar
        sx={{
          position: 'static',
          bgcolor: '#222',
          borderRadius: '3px',
          div: { boxShadow: 'none', bgcolor: 'transparent' },
        }}
        open
        message={msg}
      />
      <span className='text-gray-500 text-[13px]'>{sendAt}</span>
    </li>
  );
};

export default Message;
