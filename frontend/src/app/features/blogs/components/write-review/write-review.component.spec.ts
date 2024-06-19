// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { WriteReviewComponent } from './write-review.component';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { BlogService } from 'src/app/features/blogs/services/blog.service';
// import { Title } from '@angular/platform-browser';
// import { SharedService } from 'src/app/shared/services/shared.service';
// import { ActivatedRoute } from '@angular/router';
// import { of, throwError } from 'rxjs';
// import { Blog } from 'src/app/features/blogs/models/blog';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MessageDialogService } from 'src/app/shared/dialogs/message-dialog/message-dialog.service';


// describe('WriteReviewComponent', () => {
//   let component: WriteReviewComponent;
//   let fixture: ComponentFixture<WriteReviewComponent>;
//   let blogServiceMock: any;
//   let messageDialogServiceMock: any;
//   let sharedServiceMock: any;
//   let titleServiceMock: any;
//   let activatedRouteMock: any;

//   beforeEach(async () => {
//     blogServiceMock = jasmine.createSpyObj('BlogService', ['getBlogBySlug', 'createReview']);
//     messageDialogServiceMock = jasmine.createSpyObj('MessageDialogService', ['openMessageDlg']);
//     sharedServiceMock = jasmine.createSpyObj('SharedService', [], { appTitle: 'Test Blog' });
//     titleServiceMock = jasmine.createSpyObj('Title', ['setTitle']);
//     activatedRouteMock = { snapshot: { paramMap: jasmine.createSpyObj('ParamMap', ['get']) } };

//     await TestBed.configureTestingModule({
//       declarations: [WriteReviewComponent],
//       imports: [ReactiveFormsModule,
//         HttpClientTestingModule,
//       ],
//       providers: [
//         FormBuilder,
//         { provide: BlogService, useValue: blogServiceMock },
//         { provide: MessageDialogService, useValue: messageDialogServiceMock },
//         { provide: SharedService, useValue: sharedServiceMock },
//         { provide: Title, useValue: titleServiceMock },
//         { provide: ActivatedRoute, useValue: activatedRouteMock },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WriteReviewComponent);
//     component = fixture.componentInstance;
//     // Set a default mock blog with an empty reviews array
//     component.blog = {
//       _id: '1',
//       id: 1,
//       name: 'Test Blog',
//       slug: 'test-blog',
//       price: 100,
//       image: 'test-image.jpg',
//       brand: 'Test Brand',
//       category: 'Test Category',
//       countInStock: 10,
//       description: 'Test Description',
//       rating: 4.5,
//       numReviews: 2,
//       reviews: [] // Ensure this property is defined
//       // ... any other required properties
//     };
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should set the blog and title on getBlog success', () => {
//     const blogMock: Blog = {
//       _id: '1',
//       id: 2,
//       name: 'Test Blog',
//       slug: 'test-blog',
//       price: 100,
//       image: 'test-image.jpg',
//       brand: 'Test Brand',
//       category: 'Test Category',
//       countInStock: 10,
//       description: 'Test Description',
//       rating: 4.5,
//       numReviews: 2,
//       reviews: [],
//       // ... any other required properties
//     };


//     activatedRouteMock.snapshot.paramMap.get.and.returnValue('test-slug');
//     blogServiceMock.getBlogBySlug.and.returnValue(of(blogMock));

//     component.getBlog();
//     expect(blogServiceMock.getBlogBySlug).toHaveBeenCalledWith('test-slug');
//     expect(component.blog).toEqual(blogMock);
//     expect(titleServiceMock.setTitle).toHaveBeenCalledWith(`Review for Test Blog - Test Blog`);
//   });

//   it('should handle errors on getBlog failure', () => {
//     activatedRouteMock.snapshot.paramMap.get.and.returnValue('test-slug');
//     blogServiceMock.getBlogBySlug.and.returnValue(throwError('Error'));

//     // Run change detection to ensure the template updates with the mock blog
//     fixture.detectChanges();
//     component.getBlog();
//     expect(messageDialogServiceMock.openMessageDlg).toHaveBeenCalledWith({ message: 'Error', type: 'error' });
//   });

//   it('should submit a review with valid form data', () => {
//     component.form.controls['comment'].setValue('Great blog');
//     component.form.controls['rating'].setValue(5);
//     blogServiceMock.createReview.and.returnValue(of({}));
//     component.onSubmit();
//     expect(blogServiceMock.createReview).toHaveBeenCalledWith(component.blog._id, 'Great blog', 5);
//   });

//   it('should not submit a review with invalid form data', () => {
//     component.form.controls['comment'].setValue('');
//     component.form.controls['rating'].setValue('');
//     component.onSubmit();
//     expect(blogServiceMock.createReview).not.toHaveBeenCalled();
//   });
// });

