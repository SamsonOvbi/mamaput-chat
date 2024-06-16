import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MaterialModule } from '../../../shared/MaterialModule/material.module';

@NgModule({
  declarations: [],
  imports: [RouterModule, SweetAlert2Module, CommonModule, MaterialModule, ],
  exports: [],
})
export class SharedNavBarModule {}
