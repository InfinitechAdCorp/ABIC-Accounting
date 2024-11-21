export type ActionResponse = {
  code: number;
  message: string;
  errors?: {
    [key: string]: string;
  };
};
