import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraftComponent } from '../drafts/draft/draft.component';
import { MainProfileComponent } from './main-profile-leftNav/main-profile.component';
import { MyblogComponent } from './myblog/myblog.component';
import { AuthGuard } from '../auth/helpers/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full', },
  { path: 'myblog', canActivate: [AuthGuard], component: MyblogComponent },
  { path: 'draft', canActivate: [AuthGuard], component: DraftComponent },
  // {
  //   path: '', component: MainProfileComponent, canActivate: [AuthGuard],
  //   children: [      
  //   ],
  // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
