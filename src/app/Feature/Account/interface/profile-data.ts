export interface userProfileData {
  status: boolean;
  code: number;
  payload: Payload;
}

export interface Payload {
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}
