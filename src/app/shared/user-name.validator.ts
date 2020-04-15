import { AbstractControl, ValidatorFn } from '@angular/forms';
//Forbidden
// export function forbiddenNames(
//   ctrl: AbstractControl
// ): { [key: string]: any } | null {
//   const forbidden = /regx/.test(ctrl.value);
//   return forbidden ? { forbiddenName: { value: ctrl.value } } : null;
// }

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(ctrl.value);
    return forbidden ? { forbiddenName: { value: ctrl.value } } : null;
  };
}
