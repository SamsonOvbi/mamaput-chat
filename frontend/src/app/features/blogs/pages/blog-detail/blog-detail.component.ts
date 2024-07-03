import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  public data: any;
  public id: string | null | undefined;
  contentLoaded = false;
  ngxLoaderTheme = {
    margin: '0 auto', width: '50%', height: '40px', display: 'flex',
    'justify-content': 'center', 'margin-bottom': '26px'
  };
  public apiUrl = environment.apiUrl;

  constructor(
    private activatedRouter: ActivatedRoute,
    private blogService: BlogService,
    public sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {    
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    console.log('id...', this.id);
    this.blogService.getSingleBlog(this.id).subscribe((res: any) => {
      console.log('res data..', res);
      this.data = res.data;
      this.contentLoaded = true;
      console.log('the value of data', this.data);
    });
  }

}
