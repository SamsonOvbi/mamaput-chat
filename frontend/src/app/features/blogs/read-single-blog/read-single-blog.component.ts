import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-read-single-blog',
  templateUrl: './read-single-blog.component.html',
  styleUrls: ['./read-single-blog.component.css'],
})
export class ReadSingleBlogComponent implements OnInit {
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
