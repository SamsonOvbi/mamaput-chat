// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ProductCardComponent } from './blog-card.component';
// import { Title } from '@angular/platform-browser';
// import { SharedService } from 'src/app/shared/services/shared.service';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import { Blog } from 'src/app/features/blogs/models/blog';
// import { environment } from 'src/environments/environment';

// describe('ProductCardComponent', () => {
//   let component: ProductCardComponent;
//   let fixture: ComponentFixture<ProductCardComponent>;
//   let mockTitleService: Title;
//   let mockSharedService: SharedService;

//   beforeEach(async () => {
//     mockTitleService = jasmine.createSpyObj('Title', ['setTitle']);
//     mockSharedService = { appTitle: 'MamaPut eShop', baseUrl: environment.baseUrl, userAddress: '' } as SharedService;

//     await TestBed.configureTestingModule({
//       declarations: [ ProductCardComponent ],
//       providers: [
//         { provide: Title, useValue: mockTitleService },
//         { provide: SharedService, useValue: mockSharedService }
//       ],
//       schemas: [NO_ERRORS_SCHEMA]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProductCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should correctly set the title of the page using the shared service\'s appTitle property', () => {
//     expect(mockTitleService.setTitle).toHaveBeenCalledWith(`Blog Box - ${mockSharedService.appTitle}`);
//   });

//   it('should correctly emit the blog when the onAddToCart method is called', () => {
//     spyOn(component.addToCart, 'emit');
//     const testProduct = { id: 1, name: 'Test Blog' } as Blog;
//     component.onAddToCart(testProduct);
//     expect(component.addToCart.emit).toHaveBeenCalledWith(testProduct);
//   });

//   it('should correctly set the rowHeight property based on the cols input property', () => {
//     component.cols = 3;
//     component.ngOnInit();
//     expect(component.rowHeight).toEqual(350); // Assuming ROW_HEIGHT = { 1: 400, 3: 350, 4: 300 }
//   });


// });
