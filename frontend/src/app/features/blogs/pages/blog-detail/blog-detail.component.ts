import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  public data: any;
  public id: string | null | undefined;
  contentLoaded = false;
  ngxLoaderTheme = {
    margin: '0 auto', width: '50%', height: '40px', display: 'flex',
    'justify-content': 'center', 'margin-bottom': '26px'
  };
  public apiUrl = environment.apiUrl;
  today = new Date();
  blogSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private blogService: BlogService,
    public sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {    
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    console.log('id...', this.id);
    this.blogSubscription = this.blogService.getSingleBlog(this.id).subscribe((res: any) => {
      this.data = res.data;
      this.contentLoaded = true;
    });
    this.subscriptions.push(this.blogSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
