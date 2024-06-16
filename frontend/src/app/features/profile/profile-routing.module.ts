import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraftComponent } from '../draft/draft.component';
import { MainProfileComponent } from './main-profile-leftNav/main-profile.component';
import { MyblogComponent } from '../blogs/myblog/myblog.component';
import { ProfileComponent } from './user-details/profile.component';
import { AuthGuard } from '../auth/helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  {
    path: '', component: MainProfileComponent, canActivate: [AuthGuard],
    children: [
      { path: 'me', component: ProfileComponent },
      { path: 'myblog', component: MyblogComponent },
      { path: 'draft', component: DraftComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
