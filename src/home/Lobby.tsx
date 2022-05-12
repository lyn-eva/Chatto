import React from 'react';
import { MemberType } from './homeTypes';
import Member from './Member';

const members: MemberType[] = [
  {
    id: 1,
    username: '依娜',
    lastActive: '7:28 AM',
    msg: 'Organic foreground Graphical User Interface',
  },
  {
    id: 2,
    username: '璟雯',
    lastActive: '4:58 AM',
    msg: 'Programmable directional support',
  },
  {
    id: 3,
    username: '亦涵',
    lastActive: '2:24 AM',
    msg: 'Polarised systematic policy',
  },
  {
    id: 4,
    username: '思宏',
    lastActive: '4:01 PM',
    msg: 'Cloned fault-tolerant process improvement',
  },
  {
    id: 5,
    username: '玺越',
    lastActive: '3:07 PM',
    msg: 'Intuitive encompassing task-force',
  },
];

const Lobby: React.FC = () => {
  return (
    <main className='pt-6'>
      {members.map((member) => (
        <Member {...member} key={member.id} />
      ))}
    </main>
  );
};

export default Lobby;
