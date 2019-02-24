export interface IBlog {
  id?: number;
  title?: string;
  author?: string;
  post?: any;
}

export const defaultValue: Readonly<IBlog> = {};
