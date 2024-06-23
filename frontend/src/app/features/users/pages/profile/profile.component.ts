import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { BlogService } from 'src/app/features/blogs/services/blog.service';
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
  profileForm: FormGroup;
  public apiUrl = environment.apiUrl;

  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private sharedService: SharedService,
  ) {
    this.profileForm = this._fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.userService.profile().subscribe((res: any) => {
      this.sharedService.setProfileImage(res.data.image);
      this.profileForm.controls['username'].patchValue(res.data.username);
      this.profileForm.controls['email'].patchValue(res.data.email);
      if (res.data.image) {
        this.imageSrc = this.apiUrl + '/' + res.data.image;
      }
    });
  }

  uploadFile(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      const filePath = URL.createObjectURL(file);
      console.log(filePath);
      this.file = file;
      this.profileForm.patchValue({ photo: this.file });
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.file);
    }
  }

  get email() {
    return this.profileForm.value['email'];
  }

  get username() {
    return this.profileForm.value['username'];
  }

  saveDetails() {
    let formData = new FormData();
    if (this.file) {
      formData.append('username', this.username);
      formData.append('image', this.file);
      formData.append('email', this.email);
      const image = formData.get('image') as File;
      const fileName = image.name;
      // console.log({fileName});
      let data = { username: formData.get('username'), email: formData.get('email'), image: fileName };
      console.error({ saveDetails_data_A1: data });
      this.authService.updateUserDetail(data).subscribe((res: any) => {
        this.sharedService.setProfileImage(res.data.image);
      });
    } else {
      let image = this.imageSrc.split(`${this.apiUrl}/`);
      let data = { username: this.username, email: this.email, image: image[1], };
      // console.error({ saveDetails_data_A2: data });
      this.authService.updateUserDetail(data).subscribe({
        next: (res: any) => {
          this.sharedService.setProfileImage(res.data.image);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          Toast.fire({ icon: 'success', title: 'Detail Updated successfully', });
        },
        error: (error: any) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          Toast.fire({ icon: 'error', title: `${error.message}`, });
        }
      });
    }
  }

  openPassworChangeDialog() {
    const dialogOptions = { width: '50%', height: 'auto', backdropClass: 'bgClass', }
    const dialogRef = this.dialog.open(PasswordChangeDialogComponent, dialogOptions);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('closed password dialog', result);
    });
  }
  
}
