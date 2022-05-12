import { Notes } from './notes';

export class Users {
  id?: number;
  birthDate?: Date;
  name?: string;
  avatar?: string;
  bio?: string;
  notes: Notes[] = [];
}
