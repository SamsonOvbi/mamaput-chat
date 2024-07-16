import { Component, ViewChild, OnDestroy, OnInit, HostListener, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

import { Title } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/services/shared.service';

// import { ROW_HEIGHT } from '../../../../models/types';
import { MessageDialogService } from 'src/app/shared/dialogs/message-dialog/message-dialog.service';
import { BlogService } from '../../services/blog.service';
import { BlogData } from '../../models/blog-model';
import { ROW_HEIGHT } from '../../models/types';

@Component({
  selector: 'app-blog-box',
  templateUrl: './dispay-box.component.html',
  styleUrls: ['./dispay-box.component.scss']
})
export class DisplayBoxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() blogsList!: BlogData[];
  @Input() blogsSearch!: BlogData[];
  blogData!: BlogData[];

  @Input() showSlides!: boolean;
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  drawerMode = false;
  fullWidthMode = false;

  cols = 1;
  rowHeight = ROW_HEIGHT[this.cols];
  @Input() category?: string;

  totalBlogs = 20;
  itemsPerPage = 20;
  rating = 0;
  order = 'lowest';
  minValue = 0;
  maxValue = 2000;
  appTitle = '';

  error = false;
  playInterval = 3000;
  changes!: SimpleChanges;

  /** This variable contain subscription from service that would be removed when the component is destroyed to avoid memory leaks */
  cartSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    private blogService: BlogService,
    private messageDialogService: MessageDialogService,
    private titleService: Title,
    private sharedService: SharedService,
  ) {
  }

  ngOnInit() {
    this.appTitle = this.sharedService.appTitle;
    this.titleService.setTitle(`Display Box - ${this.appTitle}`);
  }

  /**
   * Updates page layout
   * @param colsCount is the number of columns to display the blog list per row
   */
  onColumnsCountUpdate(colsCount: number): void {
    this.cols = colsCount;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.blogsSearch || changes.blogsList) {
      this.blogData = changes.blogsSearch?.currentValue || changes.blogsList?.currentValue;
      this.totalBlogs = this.blogsSearch?.length || this.blogsList?.length;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
