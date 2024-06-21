import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SharedService } from './shared.service';
import { BlogData } from 'src/app/features/blogs/models/blog-model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private titleService: Title
  ) { }
  public setBlogMetaTags(blog: BlogData, sharedService: SharedService) {

    this.titleService.setTitle(`${blog.title} - ${sharedService.appTitle}`);

    this.meta.addTags([
      { title: 'description', content: blog.description },
      {
        property: 'og:title',
        content: `${blog.title} -${sharedService.appTitle}`,
      },
      { property: 'og:site', content: 'website', },
      // { property: 'og:url', content: sharedService.baseUrl + blog.slug, },
      { property: 'og:image', content: blog.image, },
      { property: 'og:description', content: blog.description, },
      { property: 'og:site_title', content: sharedService.appTitle, },
    ]);
  }

}
