export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAuthState = {
  user: TUser | null;
  token: string | null;
};

export type TSigninValue = {
  email: string;
  password: string;
};

export type TSignupValue = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
};
