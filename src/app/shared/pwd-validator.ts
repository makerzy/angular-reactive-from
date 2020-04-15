import { AbstractControl } from '@angular/forms';

export function pwdValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const validatePassword = control.get('validatePassword');
  if (password.pristine || validatePassword.pristine) {
    return null;
  }
  return password &&
    validatePassword &&
    password.value !== validatePassword.value
    ? { notSame: true }
    : null;
}
