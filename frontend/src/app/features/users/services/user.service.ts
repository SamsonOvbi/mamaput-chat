import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient, private router: Router,
    private authService: AuthService,
  ) { };
 
  /*
  Get User Blog
   */
  uploadImage(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(`${environment.apiUrl}/upload`, formData, this.authService.setHeader())
  }
  
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`, this.authService.setHeader());
  }

  myBlog() {
    return this.http.get(`${this.apiUrl}/user/myBlogs`, this.authService.setHeader());
  }

  myDraft() {
    return this.http.get(`${this.apiUrl}/user/myDrafts`, this.authService.setHeader());
  }
  // Blog Routes Ends Here
}
