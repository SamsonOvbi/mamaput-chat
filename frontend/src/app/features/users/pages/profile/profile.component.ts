import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PasswordChangeDialogComponent } from 'src/app/features/dialogs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public imageSrc: any;
  public file: any;
  editorForm: FormGroup;
  public apiUrl = environment.apiUrl;

  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private sharedService: SharedService,
  ) {
    this.editorForm = this._fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getProfile().subscribe((res: any) => {
      this.sharedService.setProfileImage(res.data.image);
      this.editorForm.controls['username'].patchValue(res.data.username);
      this.editorForm.controls['email'].patchValue(res.data.email);
      if (!this.imageSrc) {
        this.imageSrc = res.data.image;
      }
      this.editorForm.controls['image'].patchValue(this.imageSrc);
    });
  }

  uploadFile(event: any) {
    const file: File = event?.target.files[0];
    this.file = file.name;
    if (file) {
      this.userService.uploadImage(file).subscribe((res: any) => {
        this.imageSrc = res.secure_url;
        this.editorForm.controls['image'].patchValue(res.secure_url);
        this.getUserProfile();
      });
    }
  }

  get email() {
    return this.editorForm.value['email'];
  }

  get username() {
    return this.editorForm.value['username'];
  }

  saveDetails() {
    const data = { username: this.username, email: this.email, image: this.imageSrc, file: this.file };
    this.authService.updateUserDetail(data).subscribe({
      next: (res: any) => {
        this.sharedService.setProfileImage(res.data.image);
        const Toast = Swal.mixin({
          toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true,
        });
        Toast.fire({ icon: 'success', title: 'Detail Updated successfully' });
      },
      error: (error: any) => {
        const Toast = Swal.mixin({
          toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true,
        });
        Toast.fire({ icon: 'error', title: `${error.message}` });
      }
    });
  }

  openPassworChangeDialog() {
    const dialogOptions = { width: '50%', height: 'auto', backdropClass: 'bgClass', }
    const dialogRef = this.dialog.open(PasswordChangeDialogComponent, dialogOptions);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('closed password dialog', result);
    });
  }

}
