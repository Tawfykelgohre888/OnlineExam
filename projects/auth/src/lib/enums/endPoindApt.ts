export class authEndPoint {
  static sendEmailVerification = `/api/auth/send-email-verification`;
  static isEmailVerified = `/api/auth/confirm-email-verification`;
  static SIGNUP = `/api/auth/register`;
  static SIGNIN = `/api/v1/auth/signin`;
  static CHANGEPASSWORD = `/api/v1/auth/changePassword`;
  static DELETEACCOUNT = `/api/v1/auth/deleteMe`;
  static EDITPROFILE = `/api/v1/auth/editProfile`;
  static LOGOUT = `/api/v1/auth/logout`;
  static GETLOGGEDINFO = `/api/v1/auth/profileData`;
  static FORGETPASSWORD = `/api/v1/auth/forgotPassword`;
  static VERIFYRESETCODE = `/api/v1/auth/verifyResetCode`;
  static RESETPASSWORD = `/api/v1/auth/resetPassword`;
}
