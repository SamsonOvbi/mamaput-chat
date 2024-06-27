import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PageEvent } from '@angular/material/paginator';
import { BlogData } from '../../models/blog-model';
import { ROW_HEIGHT } from '../../models/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  contentLoaded = false;
  noDataFound = true;
  // @Input() blogs!: BlogData[];
  @Input() blogs!: any;
  @Input() showSlides = true;
  @Input() fullWidthMode = false;
  @Input() cols = 1;
  @Input() rowHeight = ROW_HEIGHT[this.cols];

  //Pass event to parent component
  // @Output() addToCart = new EventEmitter<BlogData>();
  @Output() addToCart = new EventEmitter<any>();
  @Input() loading?: boolean;
  @Input() error?: boolean;

  currentPage = 1;
  itemsPerPage = 20;
  @Input() totalBlogs!: number; 
  apiUrl = environment.apiUrl;

  constructor(
    private titleService: Title,
    private sharedService: SharedService,
    public sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.totalBlogs = this.blogs.length;
    this.titleService.setTitle(`BlogData Card - ${this.sharedService.appTitle}`);
  }

  get paginatedBlogs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.contentLoaded = true; 
    this.noDataFound = false;
    return this.blogs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
  }
  trackByBlogId(index: any, blog: any) {
    return blog.id;
  }

  /** Emits the blog gotten from the cart */
  // onAddToCart(blog: BlogData): void {
  onAddToCart(blog: any): void {
    this.addToCart.emit(blog);
  }

}
