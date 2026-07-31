import { Component, computed, input } from '@angular/core';
import { Message } from 'primeng/message';
@Component({
  selector: 'app-validation-msg',
  imports: [Message],
  templateUrl: './validation-msg.component.html',
  styleUrl: './validation-msg.component.scss',
})
export class ValidationMsgComponent {
  errors = input<any>(null);
  touched = input(false);
  label = input('');

  // Dictionary of dynamic error messages in English
  private errorMessages: Record<string, (err?: any) => string> = {
    required: () => `${this.label() || 'This field'} is required`,
    minlength: (err) =>
      `${this.label() || 'This field'} must be at least ${err?.requiredLength} characters`,
    maxlength: (err) =>
      `${this.label() || 'This field'} cannot exceed ${err?.requiredLength} characters`,
    email: () => 'Invalid email address',
    pattern: () =>
      'Password must contain at least one uppercase letter and one special character',
    mismatch: () => 'Passwords do not match',
  };

  // Dynamic computed message signal
  errorMessage = computed(() => {
    if (!this.touched() || !this.errors()) return null;

    // Get the first error key (e.g., 'required' or 'email')
    const firstKey = Object.keys(this.errors())[0];
    const errorFunction = this.errorMessages[firstKey];

    return errorFunction
      ? errorFunction(this.errors()[firstKey])
      : 'Invalid field value';
  });
}
