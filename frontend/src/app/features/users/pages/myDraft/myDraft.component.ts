import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { DraftService } from '../../../drafts/services/draft.service';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../services/user.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { swalFireWarning, swalMixin } from '../../../../shared/constants';

@Component({
  selector: 'app-myDraft',
  templateUrl: './myDraft.component.html',
  styleUrls: ['./myDraft.component.scss'],
})
export class MyDraftComponent implements OnInit {
  public contentLoaded = false;
  public myDraft: any;
  public apiUrl = environment.apiUrl;
  public noDataFound: boolean = false;
  alertOpt: SweetAlertOptions = {};
  appTitle = '';

  constructor(
    public sanitizer: DomSanitizer,
    private draftService: DraftService,
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appTitle = this.sharedService.appTitle;
    this.getDraftData();
  }

  getDraftData() {
    this.userService.myDraft().subscribe({
      next: (res: any) => {
        this.myDraft = res.draft;
        if (res.draft && res.draft.drafts.length === 0) {
          this.noDataFound = true;
          const Toast = Swal.mixin({ ...swalMixin, position: 'top-end', });
          Toast.fire({ icon: 'info', title: 'No Draft Found', });
        }
        this.contentLoaded = true;
      },
      error: (err: any) => {
        this.noDataFound = true;
        const Toast = Swal.mixin({ ...swalMixin, position: 'top-end', });
        Toast.fire({ icon: 'error', title: 'Something Went Wrong', });
      }
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  editDraft(id: any) {
    this.router.navigate(['drafts/edit-draft', id]);
  }

  deleteDraft(id: any) {
    Swal.fire({
      ...swalFireWarning, icon: 'warning', confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.draftService.deleteDraft(id).subscribe({
          next: (res: any) => {
            this.getDraftData();
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          },
          error: (err: any) => {
            Swal.fire({ icon: 'error', title: 'Oops...', text: `Something Went Wrong..!`, });
          }
        });
      }
    });
    console.log('', id);
  }

}
