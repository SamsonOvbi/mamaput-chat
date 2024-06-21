import { NgModule } from '@angular/core';

// Material

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MatProgressBarModule, MAT_PROGRESS_BAR_DEFAULT_OPTIONS, MatProgressBarDefaultOptions,
} from '@angular/material/progress-bar';
import {
  MatProgressSpinnerModule, MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, MatProgressSpinnerDefaultOptions,
} from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule, } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

const matProgressBarOptions: MatProgressBarDefaultOptions = {
  color: 'primary', mode:'indeterminate', 
};

const matProgressSpinnerOptions: MatProgressSpinnerDefaultOptions = {
  color: 'primary', diameter: 50, strokeWidth: 5, 

};

const matModule = [
  // MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  // MatBottomSheetModule,
  // MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  // MatChipsModule,
  // MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  // MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  // MatTabsModule,
  MatToolbarModule,
  // MatTooltipModule,
  // MatNativeDateModule,

  // CdkTableModule,
  // A11yModule,
  // BidiModule,
  // CdkAccordionModule,
  // ObserversModule,
  // OverlayModule,
  // PlatformModule,
  // PortalModule,
]

@NgModule({
  imports: [ matModule ],
  exports: [ matModule ],
  providers: [
    { provide: MAT_PROGRESS_BAR_DEFAULT_OPTIONS, useValue: matProgressBarOptions, },
    { provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, useValue: matProgressSpinnerOptions, },
  ],
})
export class MaterialModule {}
 