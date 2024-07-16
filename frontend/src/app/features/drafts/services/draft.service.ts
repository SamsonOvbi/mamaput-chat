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
export class DraftService {
  apiUrl = environment.apiUrl;
  public isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient, private router: Router,
    private authService: AuthService,
  ) { };

  /**
   * Draft Routes Starts Here
   *
   */

  saveAsDraft(data: any) {
    console.log({ data });
    return this.http.post(`${this.apiUrl}/draft/save-draft`, data, this.authService.setHeader());
  }

  getSingleDraft(id: any) {
    return this.http.get(`${this.apiUrl}/draft/get-single-draft/${id}`,
      this.authService.setHeader()
    );
  }

  getAllDraft() {
    return this.http.get(`${this.apiUrl}/draft/get-all-draft`, this.authService.setHeader());
  }

  updateDraft(data: any, id: any) {
    // console.log({ data });
    return this.http.put(`${this.apiUrl}/draft/update-draft/${id}`, data, this.authService.setHeader()
    );
  }

  deleteDraft(id: string) {
    return this.http.delete(`${this.apiUrl}/draft/delete-draft/${id}`, this.authService.setHeader());
  }

  publishDraft(id: any, data?: any) {
    return this.http.post(`${this.apiUrl}/draft/publish-draft/${id}`, data, this.authService.setHeader()
    );
  }

  //Drafts Routes Ends Here
}
