import { ISession } from 'app/shared/model/conference/session.model';

export interface ISpeaker {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  twitter?: string;
  bioContentType?: string;
  bio?: any;
  sessions?: ISession[];
}

export const defaultValue: Readonly<ISpeaker> = {};
