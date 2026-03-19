export enum RequestType {
  LEAVE = 'LEAVE',
  EXPENSE = 'EXPENSE',
  GENERAL = 'GENERAL'
}

export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface Request {
  id?: number;
  title: string;
  description: string;
  requestedBy: string;
  requestType: RequestType;
  status: Status;
  createdAt?: Date;
}