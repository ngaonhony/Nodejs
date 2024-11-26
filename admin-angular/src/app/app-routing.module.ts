import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';
import { PostManagementComponent } from './pages/post-management/post-management.component';
import { ServiceManagementComponent } from './pages/service-management/service-management.component';
import { FeedbackManagementComponent } from './pages/feedback-management/feedback-management.component';
import { PaymentManagementComponent } from './pages/payment-management/payment-management.component';
import { AuthGuard } from './auth/auth.guard'; // Giả sử bạn đã định nghĩa AuthGuard
import { LoginComponent } from './pages/login/login.component';
const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: '',redirectTo: '/dashboard',pathMatch: 'full',},
      { path: 'dashboard',loadChildren: () =>import('./pages/pages.module').then(m => m.PagesModule),},
      { path: 'user-management/list', component: UserManagementComponent },
      { path: 'category-management/list', component: CategoryManagementComponent },
      { path: 'post-management/list', component: PostManagementComponent },
      { path: 'service-management/list', component: ServiceManagementComponent },
      { path: 'feedback-management/list', component: FeedbackManagementComponent },
      { path: 'payment-management/list', component: PaymentManagementComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}