import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  apiUrl = environment.apiUrl;
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient, private router: Router,
    private authService: AuthService,
  ) { };

  
  private handleError = (error: HttpErrorResponse | any): any => {
    switch (error.status) {
      case 400:      console.log(400);
        break;
      case 401:        console.log(401);
        let temp = localStorage.getItem('token');
        if (temp) {
          localStorage.clear();
          this.router.navigate(['/landing']);
        }
        break;
      case 500:        console.log(500);
        break;
      case 503:        console.log(503);
        break;
      // case 429:
      //
      //   console.log(0);
      //   break;
      case 429:
    }
  };

  /**
   * Get All Blogs
   */
  getBlogData() {
    return this.http
      .get(`${this.apiUrl}/blog`, this.authService.setHeader())
      .pipe(catchError(this.handleError));
  }

  /*
  Get Single Blog
   */

  getSingleBlog(id: any) {
    return this.http.get(`${this.apiUrl}/blog/${id}`);
  }

  saveBlogData(data: any) {
    console.log({ data });
    return this.http.post(`${this.apiUrl}/blog`, data, this.authService.setHeader());
  }

  deleteBlog(id: any) {
    return this.http.delete(`${this.apiUrl}/blog/${id}`, this.authService.setHeader());
  }

  updateBlog(data: any, id: any) {
    return this.http.put(`${this.apiUrl}/blog/${id}`, data, this.authService.setHeader());
  }

  /*
  Get User Blog
   */

  getMe() {
    return this.http.get(`${this.apiUrl}/user/getMe`, this.authService.setHeader());
  }

  myBlog() {
    return this.http.get(`${this.apiUrl}/user/myBlogs`, this.authService.setHeader());
  }

  // Blog Routes Ends Here
}
