import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/helpers/auth.guard';
import { MyblogComponent } from './pages/myblog/myblog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyDraftComponent } from './pages/myDraft/myDraft.component';

const routes: Routes = [
  { path: 'me', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'myblog', canActivate: [AuthGuard], component: MyblogComponent },
  { path: 'draft', canActivate: [AuthGuard], component: MyDraftComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
