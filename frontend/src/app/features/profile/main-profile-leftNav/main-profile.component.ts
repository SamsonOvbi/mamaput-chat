import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BlogService } from '../../blogs/services/blog.service';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.css'],
})
export class MainProfileComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private render: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.blogService.getMe().subscribe((res: any) => {
      console.log('checking the value', res);
    });
  }

  ngAfterViewInit() {
    const buttonCollapse = this.elementRef.nativeElement.querySelector(
      '.btn-expand-collapse'
    );
    const navPrimary =
      this.elementRef.nativeElement.querySelector('.navbar-primary');
    buttonCollapse.addEventListener('click', () => {
      navPrimary.classList.toggle('collapsed');
    });
  }
}
