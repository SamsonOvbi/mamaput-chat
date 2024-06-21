// // imports
// import { Subscription, of } from 'rxjs';
// import { BlogListComponent } from './blog-list.component';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BlogService } from 'src/app/features/blogs/services/blog.service';
// import { Blog } from 'src/app/features/blogs/models/blog';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

// describe('BlogListComponent', () => {

//   let component: BlogListComponent;
//   let fixture: ComponentFixture<BlogListComponent>;

//   let blogService: BlogService;
//   let getBlogsSpy: jasmine.Spy;
//   const blogsSubscription: Subscription = new Subscription();

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         MatSnackBarModule,
//         // modules 
//       ],
//       declarations: [BlogListComponent],
//       providers: [BlogService]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(BlogListComponent);
//     component = fixture.componentInstance;
//     blogService = TestBed.inject(BlogService);

//     setup();
//   });

//   function setup() {
//     getBlogsSpy = spyOn(blogService, 'getBlogs')
//       .and.returnValue(of([])); 
//   }

//   beforeEach(() => {
//     getBlogsSpy.calls.reset();
//   });

//   afterEach(() => {
//     blogsSubscription.unsubscribe(); // stop subscriptions
  
//     fixture.destroy(); // detach component

//     getBlogsSpy.calls.reset(); 
//     getBlogsSpy.and.callThrough(); // reset spy
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call blogService.getBlogs on init', () => {
//     component.ngOnInit();

//     expect(getBlogsSpy).toHaveBeenCalled();
//   });

//   it('should set blogsList to response from service', () => {
//     const mockBlogs: Blog[] = [];
    
//     getBlogsSpy.and.returnValue(of(mockBlogs));

//     component.ngOnInit();

//     expect(component.blogsList).toEqual(mockBlogs);
//   });

// });
