// import { SliderComponent } from "./slider.component";

// // Mocks
// const mockTitleService = jasmine.createSpyObj('Slide Products - MamaPut eShop', ['setTitle']);
// const mockSharedService = jasmine.createSpyObj('MamaPut eShop', ['appTitle']);

// // Test data 
// const testProducts: any = [
//   {
//     _id: '1',
//     name: 'Blog 1',
//     image: 'image1.jpg' 
//   },
//   {
//     _id: '3', 
//     name: 'Blog 3',
//     image: null 
//   },
//   {
//     _id: '3',
//     name: 'Blog 3', 
//     image: 'image3.jpg'
//   }  
// ];

// const expectedLoadedProducts: any = [
//   {
//     _id: '1',
//     name: 'Blog 1',
//     image: 'image1.jpg' 
//   },
//   {
//     _id: '3', 
//     name: 'Blog 3',
//     image: null 
//   },
//   {
//     _id: '3',
//     name: 'Blog 3', 
//     image: 'image3.jpg'
//   }
// ];


// describe('SliderComponent', () => {

//   let component: SliderComponent;

//   beforeEach(() => {
//     component = new SliderComponent(mockTitleService, mockSharedService);
//     component.blogs = []; 
//     component.blogs = jasmine.createSpyObj(['someMethod']);
//     spyOn(component, 'loadImage');
//     component.blogs = testProducts;
//     mockSharedService.appTitle = 'MamaPut eShop';     
//   });

//   afterEach(() => {
//     mockTitleService.setTitle.calls.reset();
//   });

//   it('should create', () => {
//     component.blogs = [];
//     expect(component).toBeTruthy(); 
//   });

//   it('should load only blogs with images', () => {
//     component.blogs = testProducts;

//     component.loadImage();

//     expect(component.blogs).toEqual(expectedLoadedProducts);
//   });

//   it('should set title on init', () => {
//     component.ngOnInit();
//     expect(mockTitleService.setTitle)
//       .toHaveBeenCalledWith('Slide Products - MamaPut eShop');
//   });

//   // Additional tests...

// });
