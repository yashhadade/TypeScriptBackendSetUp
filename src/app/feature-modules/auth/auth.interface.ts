export interface IClient {
  _id: string;
  email: string;
  password: string;
  username: string;
  role: string;
}

export interface AdminLoginData {
  nameOrEmail: string;
  password: string;
}
