import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/helpers/auth.guard';
import { DeactivateServiceGuard } from '../auth/helpers/deactivate.guard';
import { DraftDetailComponent } from './pages/draft-detail/draft-detail.component';
import { EditdraftComponent } from './pages/editdraft/editdraft.component';

const routes: Routes = [
  { path: 'draft-details/:id', component: DraftDetailComponent, },
  { path: 'edit-draft/:id', component: EditdraftComponent, }, 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
})
export class DraftsRoutingModule { }
