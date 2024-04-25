import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateNotLessThanCurrent(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const selectedDate = new Date(control.value);
    selectedDate.setHours(23, 59, 59);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return { dateNotLessThanCurrent: true };
    }

    return null;
  };
}
