import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../features/auth/helpers/auth.guard';
import { DeactivateServiceGuard } from '../features/auth/helpers/deactivate.guard';
import { EditblogComponent } from './blogs/editblog/editblog.component';
import { EditdraftComponent } from './blogs/editdraft/editdraft.component';
import { HomeComponent } from '../core/components/home/home.component';
import { LandingComponent } from '../core/landing/landing.component';
import { ReadSingleBlogComponent } from './blogs/read-single-blog/read-single-blog.component';
import { ReadblogComponent } from './blogs/readblog/readblog.component';
import { WriteblogComponent } from './blogs/writeblog/writeblog.component';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  { path: '', redirectTo: 'creators', pathMatch: 'full', }, 
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'creators', component: LandingComponent },
      { path: 'write', component: WriteblogComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateServiceGuard], },
      { path: 'read', component: ReadblogComponent, },
      { path: 'read/:id', component: ReadSingleBlogComponent, },
      { path: 'edit/:id', component: EditblogComponent, },
      { path: 'edit-draft/:id', component: EditdraftComponent, },
    ],
  },  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuillModule], 
})
export class MainRoutingModule { }
