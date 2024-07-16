// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BlogBoxComponent } from './blog-box.component';
// import { BlogService } from 'src/app/features/blogs/services/blog.service'; 
// import { CartService } from 'src/app/shared/services/cart.service';
// import { Title } from '@angular/platform-browser';
// import { SharedService } from 'src/app/shared/services/shared.service';
// import { of, throwError } from 'rxjs';
// import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
// import { Blog } from 'src/app/features/blogs/models/blog';
// import { Item } from 'src/app/features/cart/models/cart';
// import { MessageDialogService } from 'src/app/shared/dialogs/message-dialog/message-dialog.service';

// describe('BlogBoxComponent', () => {
//   let component: BlogBoxComponent;
//   let fixture: ComponentFixture<BlogBoxComponent>;
//   let titleService: Title;
//   let blogServiceMock: any;
//   let cartServiceMock: any;
//   let messageDialogServiceMock: any;
//   let titleServiceMock: any;
//   let sharedServiceMock: any;
//   let blogsList: Blog[] = [];
//   let blog: Blog;

//   beforeEach(async () => {
//     blogServiceMock = { getAllBlogs: jasmine.createSpy('getAllBlogs') };
//     messageDialogServiceMock = { openMessageDlg: jasmine.createSpy('openMessageDlg') };
//     cartServiceMock = { addItem: jasmine.createSpy('addItem') };
//     titleServiceMock = { setTitle: jasmine.createSpy('setTitle') };
//     sharedServiceMock = { appTitle: 'MamaPut eShop' };

//     component = new BlogBoxComponent(
//       blogServiceMock,
//       messageDialogServiceMock,
//       cartServiceMock,
//       titleServiceMock,
//       sharedServiceMock,  // Ensure this is correctly passed
//     );

//     await TestBed.configureTestingModule({
//       declarations: [BlogBoxComponent],
//       providers: [
//         { provide: BlogService, useValue: { getAllBlogs: () => of([]) } },
//         { provide: MessageDialogService, useValue: messageDialogServiceMock },
//         { provide: CartService, useValue: cartServiceMock },
//         { provide: Title, useValue: titleServiceMock },
//         { provide: SharedService, useValue: { appTitle: 'MamaPut eShop' } },
//       ],
//       schemas: [NO_ERRORS_SCHEMA]
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {

//     fixture = TestBed.createComponent(BlogBoxComponent);
//     component = fixture.componentInstance;
//     titleService = TestBed.inject(Title);
//     fixture.detectChanges();
//     blogsList = [
//       {
//         _id: '1', id: 1, name: 'Test Blog', slug: '', price: 100, image: '', brand: '',
//         category: '', description: '', countInStock: 0, rating: 0, numReviews: 0, reviews: [],
//       },
//     ];
//     blog = {
//       _id: '1', id: 1, name: 'Test Blog', slug: '', price: 100, image: '', brand: '',
//       category: '', description: '', countInStock: 0, rating: 0, numReviews: 0, reviews: [],
//     };

//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should set title on init', () => {
//     expect(titleServiceMock.setTitle).toHaveBeenCalledWith('Blog List - MamaPut eShop');
//   });

//   it('should correctly update the number of blogs to display when onItemsCountChange is called', () => {
//     const spy = spyOn(component, 'getBlogList').and.callThrough();
//     component.onItemsCountChange(30);
//     expect(spy).toHaveBeenCalledWith(30);
//   });

//   it('should correctly update the layout when onUpdateColumnsCount is called', () => {
//     component.onUpdateColumnsCount(3);
//     expect(component.cols).toBe(3);
//     expect(component.rowHeight).toBeDefined();
//   });


//   it('test_onAddToCart_success', () => {
//     cartServiceMock.addItem = jasmine.createSpy('addItem').and.returnValue(of('Test Blog'));
//     component.onAddToCart(blog);
//     expect(cartServiceMock.addItem).toHaveBeenCalledWith({
//       _id: '1', image: '', name: 'Test Blog', slug: '', price: 100, quantity: 1
//     });
//     expect(messageDialogServiceMock.openMessageDlg).toHaveBeenCalledWith({message: 'Test Blog added to the cart', type: 'success'});    
//   });

//   it('test_onAddToCart_error', () => {

//     const error = { message: 'Error adding blog' };
//     cartServiceMock.addItem.and.returnValue(throwError(() => error));
//     component.onAddToCart(blog);
//     expect(messageDialogServiceMock.openMessageDlg).toHaveBeenCalledWith({message: 'Error adding blog \n Blog Not added', type: 'error'});    
//   });


//   it('test_onAddToCart_extract_blog_details', () => {
//     cartServiceMock.addItem.and.callFake((item: Item) => {
//       expect(item).toEqual(jasmine.objectContaining({
//         _id: '1', image: '', name: 'Test Blog', slug: '', price: 100, quantity: 1
//       }));
//       return of('Test Blog');
//     });
//     component.onAddToCart(blog);
//   });


//   it('test_onChanges_updates_blogs_list', () => {    
//     const changesObj = {
//       blogsList: new SimpleChange(null, blogsList, true)
//     };
//     component.ngOnChanges(changesObj);
//     expect(component.blogs).toEqual(blogsList);
//   });

//   it('test_onChanges_does_not_update_blogs_list_when_no_changes', () => {
//     component.blogs = blogsList;
//     const changesObj = {};
//     component.ngOnChanges(changesObj);
//     expect(component.blogs).toEqual(blogsList);
//   });

//   it('test_onChanges_handles_undefined_inputs', () => {
//     const changesObj = {
//       blogsSearch: new SimpleChange([], undefined, false),
//       blogsList: new SimpleChange([], undefined, false)
//     };
//     component.ngOnChanges(changesObj);
//     expect(component.blogs).toEqual([]);
//   });

// });
