import { FieldValue, WhereFilterOp } from 'firebase/firestore';

export interface conversationType {
  id: string;
  msg: string;
  senderId: string;
  updated: FieldValue;
}

export interface roomType {
  created: FieldValue;
  members: string[];
  owner: string;
  other: string;
  type: string;
  updated: FieldValue;
  id: string;
  converstaions: conversationType[] | null;
}

export interface syncRoomOptionType {
  path: string;
  where: [string, WhereFilterOp, string];
  orderBy: string;
}

export interface syncConversationOptionType {
  orderBy: string;
  roomId: string;
}
