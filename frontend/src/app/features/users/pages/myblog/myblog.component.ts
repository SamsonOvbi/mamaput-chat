import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { BlogService } from '../../../blogs/services/blog.service';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../services/user.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { swalFireWarning, swalMixin } from '../../../../shared/constants';
@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.scss'],
})
export class MyblogComponent implements OnInit {
  public contentLoaded = false;
  rightImage= true;
  public myBlog: any;
  public apiUrl = environment.apiUrl;
  public noDataFound: boolean = false;
  alertOpt: SweetAlertOptions = {};
  appTitle = '';

  constructor(
    public sanitizer: DomSanitizer,
    private blogService: BlogService,
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appTitle = this.sharedService.appTitle;
    this.getBlogData();
  }

  getBlogData() {
    this.userService.myBlog().subscribe({
      next: (res: any) => {
        this.myBlog = res.blog;
        if (res.blog && res.blog.posts.length === 0) {
          this.noDataFound = true;
          const Toast = Swal.mixin({ ...swalMixin, position: 'top-end', });
          Toast.fire({ icon: 'info', title: 'No Blog Found', });
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

  editBlog(id: any) {
    this.router.navigate(['/blogs/edit', id]);
  }

  deleteBlog(id: any) {
    Swal.fire({
      ...swalFireWarning, icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe({
          next: (res: any) => {
            this.getBlogData();
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
