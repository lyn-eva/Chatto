import React from 'react';
import SnackBar from '@mui/material/Snackbar';
// import { msgTypes } from './ChatTypes';
import { MsgType } from './chatTypes';

interface Props extends MsgType {
  // isOwner: Boolean;
}

const Message: React.FC<Props> = ({ msg, sendAt }) => {
  // const isSender = 
  return (
    <li
      className={`${
        true ? 'self-end flex-row-reverse' : 'self-start'
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
