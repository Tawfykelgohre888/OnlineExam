import { LoginRegisterResponse } from "./backAdapt";
import { general } from "./genralAdptor";

export interface Adaptor {
  adapt(data:LoginRegisterResponse):general
}


