export type HttpError = {
  statusCode: number;
  error: string;
};

export type Session = {
  id: string;
  token: string;
  expiredAt: Date;
};
