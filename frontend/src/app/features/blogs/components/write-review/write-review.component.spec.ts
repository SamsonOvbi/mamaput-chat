import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WriteReviewComponent } from './write-review.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/features/products/services/product.service';
import { Title } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/features/products/models/product';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageDialogService } from 'src/app/shared/dialogs/message-dialog/message-dialog.service';


describe('WriteReviewComponent', () => {
  let component: WriteReviewComponent;
  let fixture: ComponentFixture<WriteReviewComponent>;
  let productServiceMock: any;
  let messageDialogServiceMock: any;
  let sharedServiceMock: any;
  let titleServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['getProductBySlug', 'createReview']);
    messageDialogServiceMock = jasmine.createSpyObj('MessageDialogService', ['openMessageDlg']);
    sharedServiceMock = jasmine.createSpyObj('SharedService', [], { appTitle: 'Test Blog' });
    titleServiceMock = jasmine.createSpyObj('Title', ['setTitle']);
    activatedRouteMock = { snapshot: { paramMap: jasmine.createSpyObj('ParamMap', ['get']) } };

    await TestBed.configureTestingModule({
      declarations: [WriteReviewComponent],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productServiceMock },
        { provide: MessageDialogService, useValue: messageDialogServiceMock },
        { provide: SharedService, useValue: sharedServiceMock },
        { provide: Title, useValue: titleServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteReviewComponent);
    component = fixture.componentInstance;
    // Set a default mock product with an empty reviews array
    component.product = {
      _id: '1',
      id: 1,
      name: 'Test Product',
      slug: 'test-product',
      price: 100,
      image: 'test-image.jpg',
      brand: 'Test Brand',
      category: 'Test Category',
      countInStock: 10,
      description: 'Test Description',
      rating: 4.5,
      numReviews: 2,
      reviews: [] // Ensure this property is defined
      // ... any other required properties
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the product and title on getProduct success', () => {
    const productMock: Product = {
      _id: '1',
      id: 2,
      name: 'Test Product',
      slug: 'test-product',
      price: 100,
      image: 'test-image.jpg',
      brand: 'Test Brand',
      category: 'Test Category',
      countInStock: 10,
      description: 'Test Description',
      rating: 4.5,
      numReviews: 2,
      reviews: [],
      // ... any other required properties
    };


    activatedRouteMock.snapshot.paramMap.get.and.returnValue('test-slug');
    productServiceMock.getProductBySlug.and.returnValue(of(productMock));

    component.getProduct();
    expect(productServiceMock.getProductBySlug).toHaveBeenCalledWith('test-slug');
    expect(component.product).toEqual(productMock);
    expect(titleServiceMock.setTitle).toHaveBeenCalledWith(`Review for Test Product - Test Blog`);
  });

  it('should handle errors on getProduct failure', () => {
    activatedRouteMock.snapshot.paramMap.get.and.returnValue('test-slug');
    productServiceMock.getProductBySlug.and.returnValue(throwError('Error'));

    // Run change detection to ensure the template updates with the mock product
    fixture.detectChanges();
    component.getProduct();
    expect(messageDialogServiceMock.openMessageDlg).toHaveBeenCalledWith({ message: 'Error', type: 'error' });
  });

  it('should submit a review with valid form data', () => {
    component.form.controls['comment'].setValue('Great product');
    component.form.controls['rating'].setValue(5);
    productServiceMock.createReview.and.returnValue(of({}));
    component.onSubmit();
    expect(productServiceMock.createReview).toHaveBeenCalledWith(component.product._id, 'Great product', 5);
  });

  it('should not submit a review with invalid form data', () => {
    component.form.controls['comment'].setValue('');
    component.form.controls['rating'].setValue('');
    component.onSubmit();
    expect(productServiceMock.createReview).not.toHaveBeenCalled();
  });
});

