import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProfileDataService } from '../../Services/profile-data.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-setting',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.scss',
})
export class AccountSettingComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly profileDataService = inject(ProfileDataService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly router = inject(Router);
  userForm = this.fb.nonNullable.group({
    _id: [''],
    username: [{ value: '', disabled: true }],
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [''],
    role: [''],
    isVerified: [false],
    createdAt: [''],
  });

  // Start Get User Data
  loadProfileData() {
    this.profileDataService.getProfileData().subscribe({
      next: (data) => {
        this.userForm.patchValue(data.payload.user);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load profile data',
        });
      },
    });
  }
  // End Get User Data
  // Start Update User Data
  updateProfile() {
    const { firstName, lastName, phone } = this.userForm.getRawValue();

    const updateData = {
      firstName,
      lastName,
      phone,
    };

    this.profileDataService.updateProfile(updateData).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile updated successfully',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update profile',
        });
      },
    });
  }
  //  End Update User Data
  // Start Delete Account
  deleteAccount(): void {
    this.profileDataService.deleteAccount().subscribe({
      next: (res) => {
        localStorage.removeItem('userToken');
        console.log(res);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile updated successfully',
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to Delete Account',
        });
      },
    });
  }
  // End Delete Account

  // Start Dialog Delete Account
  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete your account??',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.deleteAccount();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Account deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
  // Start Dialog Delete Account
  ngOnInit(): void {
    this.loadProfileData();
  }
}
