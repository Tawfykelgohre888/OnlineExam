import { Component, forwardRef, input, signal } from '@angular/core';
import { InputType } from './input.types';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './app-input.component.html',
  styleUrl: './app-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true,
    },
  ],
})
export class AppInputComponent implements ControlValueAccessor {
  label = input('');
  placeholder = input('');
  type = input<InputType>('text');
  required = input(false);

  value = signal('');
  isDisabled = signal(false);
  isPassword = input(false);
  showPassword = signal(false);
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInputChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  togglePassword() {
    this.showPassword.update((prev) => !prev);
  }

  currentType(): string {
    if (this.isPassword()) {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  }
}
