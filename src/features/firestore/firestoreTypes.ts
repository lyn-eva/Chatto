import { FieldValue, WhereFilterOp } from 'firebase/firestore';

export interface roomType {
  created: FieldValue;
  members: string [];
  owner: string;
  other: string;
  type: string;
  updated: FieldValue;
  id: string;
}

export interface roomConfigType {
  path: string;
  where: [string, WhereFilterOp, string];
  orderBy: string;
}
