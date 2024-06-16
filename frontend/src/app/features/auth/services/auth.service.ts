import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Add Token to request 
   */
  setHeader(): any {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      let headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      return { headers: headers };
    } else {
      let headers = new HttpHeaders({});
      return { headers: headers };
    }
  }

  setLogIn() {
    this.isLoggedIn.next(true);
  }

  logOut() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.router.navigateByUrl('/');
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
    Toast.fire({ icon: 'success', title: 'Logout successfully', });
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
  }

  forgotPassword(email: any) {
    return this.http.post(
      `${this.apiUrl}/auth/forgotPassowrd`,
      email,
      this.setHeader()
    );
  }

  updatePassword(data: any) {
    return this.http.put(
      `${this.apiUrl}/auth/upate-password`,
      data,
      this.setHeader()
    );
  }

  resetPassword(data: any, id: any) {
    return this.http.put(
      `${this.apiUrl}/auth/resetpassword/${id}`,
      data,
      this.setHeader()
    );
  }

  updateUserDetail(data: any) {
    return this.http.put(`${this.apiUrl}/auth/update-details`, data, this.setHeader());
  }

}