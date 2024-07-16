import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PageEvent } from '@angular/material/paginator';
import { BlogData } from '../../models/blog-model';
import { ROW_HEIGHT } from '../../models/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-card',
  templateUrl: './dispay-card.component.html',
  styleUrls: ['./dispay-card.component.scss']
})
export class DisplayCardComponent implements OnInit {
  contentLoaded = false;
  noDataFound = true;
  @Input() blogs!: any;
  @Input() totalBlogs!: number;

  @Input() showSlides = true;
  @Input() fullWidthMode = false;
  @Input() cols = 1;
  @Input() rowHeight = ROW_HEIGHT[this.cols];
  @Input() error?: boolean;

  currentPage = 1;
  itemsPerPage = 20;  
  apiUrl = environment.apiUrl;
  today = new Date()

  constructor(
    private titleService: Title,
    private sharedService: SharedService,
    public sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.totalBlogs = this.blogs.length;
    this.titleService.setTitle(`DisplayData Card - ${this.sharedService.appTitle}`);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.contentLoaded = true;
    this.noDataFound = false;
    return this.blogs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
  }
  trackByDataId(index: any, data: any) {
    return data.id;
  }

}
