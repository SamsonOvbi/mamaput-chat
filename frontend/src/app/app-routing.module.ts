import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./core/core.module').then((m) => m.CoreModule), },
  { path: 'blogs', loadChildren: () => import('./features/blogs/blogs.module').then((m) => m.BlogsModule), },
  { path: 'drafts', loadChildren: () => import('./features/drafts/drafts.module').then((m) => m.DraftsModule), },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule), },
  { path: 'profile', loadChildren: () => import('./features/users/profile.module').then((m) => m.ProfileModule), },
  { path: '**', component: PageNotFoundComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
