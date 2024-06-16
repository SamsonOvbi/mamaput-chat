import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { BlogService } from '../services/blog.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css'],
})
export class MyblogComponent implements OnInit {
  public contentLoaded = false;
  public myBlog: any;
  public apiUrl = environment.apiUrl;
  public noDataFound: boolean = false;
  alertOpt: SweetAlertOptions = {};

  constructor(
    public sanitizer: DomSanitizer,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.blogData();
  }

  blogData() {
    this.blogService.myBlog().subscribe(
      (res: any) => {
        this.myBlog = res.blog;
        if (res.blog && res.blog.posts.length === 0) {
          this.noDataFound = true;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({ icon: 'info', title: 'No Blog Found', });
        }
        this.contentLoaded = true;
      },
      (err) => {
        this.noDataFound = true;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'error',
          title: 'Something Went Wrong',
        });
      }
    );
  }

  counter(i: number) {
    return new Array(i);
  }

  editBlog(id: any) {
    this.router.navigate(['/edit', id]);
  }

  deleteBlog(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe(
          (res) => {
            this.blogData();
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          },
          (err) => {
            Swal.fire({ icon: 'error', title: 'Oops...', text: `Something Went Wrong..!`, });
          }
        );
      }
    });
    console.log('', id);
  }
}
