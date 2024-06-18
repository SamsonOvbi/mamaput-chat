import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/helpers/auth.guard';
import { DeactivateServiceGuard } from '../auth/helpers/deactivate.guard';
import { EditblogComponent } from './pages/editblog/editblog.component';
import { EditdraftComponent } from '../drafts/editdraft/editdraft.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { WriteblogComponent } from './pages/writeblog/writeblog.component';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full', }, 
  { path: 'landing', component: LandingComponent },
  { path: 'write', component: WriteblogComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateServiceGuard], },
  { path: 'read', component: BlogListComponent, },
  { path: 'read/:id', component: BlogDetailComponent, },
  { path: 'edit/:id', component: EditblogComponent, },
  { path: 'edit-draft/:id', component: EditdraftComponent, },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuillModule], 
})
export class MainRoutingModule { }
