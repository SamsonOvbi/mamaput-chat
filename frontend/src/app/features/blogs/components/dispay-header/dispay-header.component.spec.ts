
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BlogHeaderComponent } from './blog-header.component';
// import { Title } from '@angular/platform-browser';
// import { SharedService } from 'src/app/shared/services/shared.service';
// import { EventEmitter } from '@angular/core';
// import { MatMenuModule } from '@angular/material/menu';

// class MockTitleService {
//   setTitle = jasmine.createSpy('setTitle');
// }

// class MockSharedService {
//   appTitle = 'MamaPut eShop';
// }

// describe('BlogHeaderComponent', () => {
//   let component: BlogHeaderComponent;
//   let fixture: ComponentFixture<BlogHeaderComponent>;
//   let mockTitleService: MockTitleService;
//   let mockSharedService: MockSharedService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ BlogHeaderComponent ],
//       imports: [ MatMenuModule ], // Make sure this is included
//       providers: [
//         { provide: Title, useClass: MockTitleService },
//         { provide: SharedService, useClass: MockSharedService }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(BlogHeaderComponent);
//     component = fixture.componentInstance;
//     mockTitleService = TestBed.inject(Title) as unknown as MockTitleService;
//     mockSharedService = TestBed.inject(SharedService) as unknown as MockSharedService;
//     fixture.detectChanges();
//   });

//   it('test_onItemsUpdated', () => {
//     const newItemCount = 20;
//     expect(component.pageSize).toBe(newItemCount);
//   });

//   it('test_onColumnsUpdated', () => {
//     spyOn(component.columnsCountChange, 'emit');
//     const newColumnCount = 3;
//     component.onColumnsUpdated(newColumnCount);
//     expect(component.columnsCountChange.emit).toHaveBeenCalledWith(newColumnCount);
//   });

//   it('test_BlogHeaderComponent_constructor_sets_title_correctly', () => {
//     expect(mockTitleService.setTitle).toHaveBeenCalledWith(`Blog Header - ${mockSharedService.appTitle}`);
//   });



// });