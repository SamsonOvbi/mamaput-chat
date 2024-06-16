import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/helpers/auth.guard';
import { DeactivateServiceGuard } from '../auth/helpers/deactivate.guard';
import { EditblogComponent } from './editblog/editblog.component';
import { EditdraftComponent } from './editdraft/editdraft.component';
import { HomeComponent } from '../../core/components/home/home.component';
import { LandingComponent } from './landing/landing.component';
import { ReadSingleBlogComponent } from './read-single-blog/read-single-blog.component';
import { ReadblogComponent } from './readblog/readblog.component';
import { WriteblogComponent } from './writeblog/writeblog.component';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full', }, 
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'landing', component: LandingComponent },
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
