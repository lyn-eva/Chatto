import React from 'react';
import Message from './Message';
import { MsgTypes } from './chatTypes';

const messages: MsgTypes[] = [
  {
    id: 1,
    userId: '依娜',
    sendAt: '7:28 AM',
    msg: 'Organic foreground Graphical User Interface',
  },
  {
    id: 2,
    userId: '璟雯',
    sendAt: '4:58 AM',
    msg: 'Programmable directional support',
  },
  {
    id: 3,
    userId: '依娜',
    sendAt: '2:24 AM',
    msg: 'Polarised systematic policy',
  },
  {
    id: 4,
    userId: '璟雯',
    sendAt: '4:01 PM',
    msg: 'Cloned fault-tolerant process improvement',
  },
  {
    id: 5,
    userId: '璟雯',
    sendAt: '3:07 PM',
    msg: 'Intuitive encompassing task-force',
  },
];
const MsgBox = () => {
  return (
    <main className='h-[calc(100vh-8rem)]'>
      <ul className='flex flex-col justify-end h-full gap-3'>
        {messages.map((msg) => (
          <Message isOwner={msg.userId === '璟雯'} {...msg} key={msg.id} />
        ))}
      </ul>
    </main>
  );
};

export default MsgBox;
