import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'User_list', component: UserListComponent },
  { path: 'User_detail/:id', component: UserDetailComponent },
  { path: '**', component: DashboardComponent },
  { path: '', redirectTo: '/Dashboard', pathMatch: 'full' },

];
