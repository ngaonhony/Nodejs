import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';
import { PostManagementComponent } from './pages/post-management/post-management.component';
import { ServiceManagementComponent } from './pages/service-management/service-management.component';
import { ServiceBookingManagementComponent } from './pages/service-booking-management/service-booking-management.component';
import { FeedbackManagementComponent } from './pages/feedback-management/feedback-management.component';
import { PaymentManagementComponent } from './pages/payment-management/payment-management.component';
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
      { path: 'category-management/list', component: CategoryManagementComponent },
      { path: 'post-management/list', component: PostManagementComponent },
      { path: 'service-management/list', component: ServiceManagementComponent },
      { path: 'service-booking-management/list', component: ServiceBookingManagementComponent },
      { path: 'feedback-management/list', component: FeedbackManagementComponent },
      { path: 'payment-management/list', component: PaymentManagementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
