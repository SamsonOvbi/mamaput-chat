
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHeaderComponent } from './product-header.component';
import { Title } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/services/shared.service';
import { EventEmitter } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

class MockTitleService {
  setTitle = jasmine.createSpy('setTitle');
}

class MockSharedService {
  appTitle = 'MamaPut eShop';
}

describe('ProductHeaderComponent', () => {
  let component: ProductHeaderComponent;
  let fixture: ComponentFixture<ProductHeaderComponent>;
  let mockTitleService: MockTitleService;
  let mockSharedService: MockSharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductHeaderComponent ],
      imports: [ MatMenuModule ], // Make sure this is included
      providers: [
        { provide: Title, useClass: MockTitleService },
        { provide: SharedService, useClass: MockSharedService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductHeaderComponent);
    component = fixture.componentInstance;
    mockTitleService = TestBed.inject(Title) as unknown as MockTitleService;
    mockSharedService = TestBed.inject(SharedService) as unknown as MockSharedService;
    fixture.detectChanges();
  });

  it('test_onItemsUpdated', () => {
    const newItemCount = 20;
    expect(component.pageSize).toBe(newItemCount);
  });

  it('test_onColumnsUpdated', () => {
    spyOn(component.columnsCountChange, 'emit');
    const newColumnCount = 3;
    component.onColumnsUpdated(newColumnCount);
    expect(component.columnsCountChange.emit).toHaveBeenCalledWith(newColumnCount);
  });

  it('test_ProductHeaderComponent_constructor_sets_title_correctly', () => {
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(`Product Header - ${mockSharedService.appTitle}`);
  });



});