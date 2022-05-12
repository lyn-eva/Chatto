import React from 'react';
import ChatHeader from '../chat/ChatHeader';
import Input from '../chat/Input';
import MsgBox from '../chat/MsgBox';

const PrivateChat = () => {
  return (
    <>
      <ChatHeader />
      <MsgBox />
      <Input />
    </>
  );
};

export default PrivateChat;
