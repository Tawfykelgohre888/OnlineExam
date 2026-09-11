import {
  Component,
  inject,
  input,
  Optional,
  Self,
  signal,
} from '@angular/core';
import { InputType } from './input.types';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ValidationMsgComponent } from '../validation-msg/validation-msg.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ValidationMsgComponent],
  templateUrl: './app-input.component.html',
  styleUrl: './app-input.component.scss',
})
export class AppInputComponent implements ControlValueAccessor {
  @Optional() @Self() public ngControl = inject(NgControl, { optional: true });

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
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

  get isInvalid(): boolean {
    if (!this.ngControl || !this.ngControl.control) return false;
    const { invalid, touched, dirty } = this.ngControl.control;
    return !!(invalid && (touched || dirty));
  }
}
