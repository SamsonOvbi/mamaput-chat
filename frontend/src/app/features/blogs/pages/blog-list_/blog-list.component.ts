// import { Component, OnInit } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';
// import { delay } from 'rxjs/operators';
// import { BlogService } from '../../services/blog.service';

// @Component({
//   selector: 'app-blog-list',
//   templateUrl: './blog-list.component.html',
//   styleUrls: ['./blog-list.component.css'],
// })
// export class BlogListComponent implements OnInit {
//   contentLoaded = false;
//   noDataFound = false;
//   title = 'ngx-skeleton-loader-demo';
//   paginatedBlogs: any;
//   apiUrl = environment.apiUrl;
  

//   constructor(
//     private router: Router,
//     private blogService: BlogService,
//     public sanitizer: DomSanitizer
//   ) { }

//   ngOnInit(): void {
//     this.blogService.getBlogData().pipe(delay(100)).subscribe({
//       next: (res: any) => {
//         this.paginatedBlogs = res.data.data;
//         if (this.paginatedBlogs.length === 0) {
//           this.noDataFound = true;
//         }
//         this.paginatedBlogs.map((val: any) => {
//           if (val.image) {
//             val.image = environment.apiUrl + '/img/' + val.image;
//           }
//         });
//         // console.log('the Blog Data response', this.paginatedBlogs);
//         this.contentLoaded = true;
//       },
//       error: (err: any) => {
//         this.contentLoaded = true;
//         this.noDataFound = true;
//       }
//     });
//   }

//   counter(i: number) {
//     return new Array(i);
//   }
// }
