import { Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  imports: [],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss',
})
export class ValidationMessageComponent {
  control = input.required<AbstractControl | null>();
  fileName = input<string | null>();

  errorMessage = computed(() => {
    const control = this.control();
    if (!control?.touched || !control.errors) {
      return null;
    }

    if (control.hasError('required')) {
      return `${this.fileName() || 'This field'} is required.`;
    }

    if (control.hasError('email')) {
      return `${this.fileName() || 'This field'} must be a valid email address.`;
    }

    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `${this.fileName() || 'This field'} must be at least ${requiredLength} characters long.`;
    }

    if (control.hasError('maxlength')) {
      const requiredLength = control.getError('maxlength').requiredLength;
      return `${this.fileName() || 'This field'} cannot be more than ${requiredLength} characters long.`;
    }

    if (control.hasError('pattern')) {
      return `${this.fileName() || 'This field'} does not match the required pattern.`;
    }

    return `${this.fileName() || 'This field'} is invalid`;
  });
}
