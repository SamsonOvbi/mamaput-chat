import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { DeactivateServiceGuard } from './features/auth/helpers/deactivate.guard';
import { AuthGuard } from './features/auth/helpers/auth.guard';
import { InterceptorService } from './features/auth/helpers/interceptor.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CommDialogModule } from './features/dialogs/comm-dialog.module';
import { QuillModule } from 'ngx-quill';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    QuillModule.forRoot(),
    CKEditorModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    CoreModule,
    SharedModule,
    CommDialogModule,
  ],
  providers: [
    DeactivateServiceGuard,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
