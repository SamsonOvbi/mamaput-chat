import { Component, OnDestroy, OnInit, HostListener, ChangeDetectorRef, ViewChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { BlogService } from 'src/app/features/blogs/services/blog.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Subscription, delay } from 'rxjs';
import { MessageDialogService } from 'src/app/shared/dialogs/message-dialog/message-dialog.service';
import { environment } from 'src/environments/environment';
import { BlogData } from '../../models/blog-model';
import { DisplayBoxComponent } from '../../components/dispay-box/dispay-box.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogListComponent implements OnInit, OnDestroy {
  @ViewChild('blogBox') blogBox!: DisplayBoxComponent;
  blogsList!: BlogData[];
  // blogsList!: any;
  showSlides = true;
  loading = true;
  error = false;
  playInterval = 3000;

  contentLoaded = false;
  title = 'ngx-skeleton-loader-demo';
  apiUrl = environment.apiUrl;
  noDataFound = false;

  /** This variable contain subscription from service that would be removed when the component is destroyed to avoid memory leaks */
  blogsSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    private blogService: BlogService,
    private messageDialogService: MessageDialogService,
    private titleService: Title,
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    const appTitle = `Blog List - ${this.sharedService.appTitle}`
    this.titleService.setTitle(appTitle);
    this.getBlogData();
  }

  private getBlogData() {
    this.blogsSubscription = this.blogService.getBlogData().pipe(delay(100)).subscribe({
      next: (res: any) => {
        this.blogsList = res.data.data;
        // console.log('this.blogsList', this.blogsList);
        if (this.blogsList.length === 0) {
          this.noDataFound = true;
        }
        this.loading = false;
        this.blogsList.map((val: any) => {
          if (val.image) {
            val.image = val.image;
          }
        });
        this.contentLoaded = true;
        this.cdRef.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        this.contentLoaded = true; this.noDataFound = true;
        this.error = true;
        const errorMessage = err.response.data.message;
        this.messageDialogService.openMessageDlg({ message: errorMessage, type: 'error' });
      },
    });

    this.subscriptions.push(this.blogsSubscription);
  }

  counter(i: number) {
    return new Array(i);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
