import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/helpers/auth.guard';
import { DeactivateServiceGuard } from '../auth/helpers/deactivate.guard';
import { QuillModule } from 'ngx-quill';

import { EditblogComponent } from './pages/editblog/editblog.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { WriteblogComponent } from './pages/writeblog/writeblog.component';

const routes: Routes = [
  { path: 'write', component: WriteblogComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateServiceGuard], },
  { path: 'read', component: BlogListComponent, },
  { path: 'blog-details/:id', component: BlogDetailComponent, },
  { path: 'edit/:id', component: EditblogComponent, },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuillModule], 
})
export class BlogsRoutingModule { }
