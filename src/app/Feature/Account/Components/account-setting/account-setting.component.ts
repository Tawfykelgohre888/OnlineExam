import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProfileDataService } from '../../Services/profile-data.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-account-setting',
  imports: [ReactiveFormsModule, FloatLabelModule],
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.scss',
})
export class AccountSettingComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly profileDataService = inject(ProfileDataService);
  private userForm = this.fb.group({
    _id: [''],
    username: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [''],
    role: [''],
    isVerified: [false],
    createdAt: [''],
  });

  getProfileData() {
    this.profileDataService.getProfileData().subscribe({
      next: (data) => {
        this.userForm.patchValue(data.user);
        console.log(data.user);
      },
      error: (error) => {
        console.error('Failed to load profile data:', error);
      },
    });
  }
  ngOnInit(): void {
    this.getProfileData();
  }
}
