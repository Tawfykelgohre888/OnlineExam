export class authEndPoint {
  static sendEmailVerification = `/api/auth/send-email-verification`;
  static isEmailVerified = `/api/auth/confirm-email-verification`;
  static SIGNUP = `/api/auth/register`;
  static SIGNIN = `/api/auth/login`;
  static FORGETPASSWORD = `/api/auth/forgot-password`;
  static RESETPASSWORD = `/api/auth/reset-password`;
  static DELETEACCOUNT = `/api/v1/auth/deleteMe`;
  static EDITPROFILE = `/api/v1/auth/editProfile`;
  static LOGOUT = `/api/v1/auth/logout`;
  static GETLOGGEDINFO = `/api/v1/auth/profileData`;
  static VERIFYRESETCODE = `/api/v1/auth/verifyResetCode`;
}
