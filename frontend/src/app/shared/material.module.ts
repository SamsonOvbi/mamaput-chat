import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

let modulesList = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,  
  MatGridListModule,  
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
];
@NgModule({
  imports: [modulesList],
  exports: [modulesList],
})
export class MaterialModule {}
