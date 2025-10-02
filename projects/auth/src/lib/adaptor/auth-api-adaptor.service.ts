import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { LoginRegisterResponse } from '../interfaces/backAdapt';
import { general } from '../interfaces/genralAdptor';
import { ChangePasswordResponse } from '../interfaces/ChangePasswordResponse';
import { forgetPasswordResponse } from '../interfaces/forgetPasswordResponse';
import { verifyResetCodeResponse } from '../interfaces/verifyResetCodeResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdaptorService implements Adaptor {
  adapt(data: LoginRegisterResponse): general {
    return {
      message: data.message,
      token: data.token,
      email: data?.user?.email!,
    };
  }

  adaptorChangePasowrd(res: ChangePasswordResponse): general {
    return {
      message: res.message,
      token: res.token,
    };
  }

  adaptSendOtp(res: forgetPasswordResponse): forgetPasswordResponse {
    return {
      message: res.message,
      info: res.info,
    };
  }

  adaptverifyResetCode(res: verifyResetCodeResponse) {
    return {
      message: res.message,
      code: res.code,
    };
  }
}
