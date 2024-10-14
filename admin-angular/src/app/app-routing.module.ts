import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      { path: 'user-management/list', component: UserManagementComponent },
      { path: 'user-management/list', component: UserManagementComponent },
      { path: 'user-management/list', component: UserManagementComponent },
      { path: 'user-management/list', component: UserManagementComponent },
      { path: 'user-management/list', component: UserManagementComponent },
      { path: 'user-management/list', component: UserManagementComponent },
      { path: 'user-management/list', component: UserManagementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
