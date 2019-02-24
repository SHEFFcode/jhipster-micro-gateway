import { Moment } from 'moment';
import { ISpeaker } from 'app/shared/model/conference/speaker.model';

export interface ISession {
  id?: number;
  title?: string;
  descriptionContentType?: string;
  description?: any;
  startDateTime?: Moment;
  endDateTime?: Moment;
  speakers?: ISpeaker[];
}

export const defaultValue: Readonly<ISession> = {};
