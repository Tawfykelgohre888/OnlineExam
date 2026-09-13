export interface LoginRegisterResponse {
  status: boolean;
  code: number;
  payload: {
    user: {
      id: string;
      username: string;
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      emailVerified: boolean;
      phoneVerified: boolean;
      role: string;
    };
    token: string;
  };
}
