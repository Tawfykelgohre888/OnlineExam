import { Validators } from '@angular/forms';

export const storePasswordValidator = Validators.pattern(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export const phoneNumberValidator = Validators.pattern('^01[0-2,5][0-9]{8}$');

export const required = Validators.required;

export const email = Validators.email;

export const maxLength = Validators.maxLength(7);

export const minLength = Validators.minLength(4);
