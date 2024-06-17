import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  public data: any; 
  public id: string | null | undefined;
  contentLoaded = false;
  constructor(
    private activatedRouter: ActivatedRoute,
    private blogService: BlogService,
    public sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.activatedRouter.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      // console.log('id...', this.id);
    });
    this.blogService.getSingleBlog(this.id).subscribe((res: any) => {
      // console.log('res data..', res);
      this.data = res.data;
      let imagename = this.data.image;
      this.data.image = environment.apiUrl + '/img/' + imagename;
      this.contentLoaded = true;
      // console.log('the value of data', this.data);
    });
  }
}
