import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/blogs/main.module').then((m) => m.MainModule), },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule), },
  {
    path: 'profile', loadChildren: () => import('./features/profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
