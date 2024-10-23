import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { PostManagementComponent } from './post-management/post-management.component';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { ServiceBookingManagementComponent } from './service-booking-management/service-booking-management.component';
import { FeedbackManagementComponent } from './feedback-management/feedback-management.component';
import { PaymentManagementComponent } from './payment-management/payment-management.component';
export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'user-manage',
    component: UserManagementComponent,
    data: {
      title: 'User Management',
    },
  },
  {
    path: 'category-manage',
    component: CategoryManagementComponent,
    data: {
      title: 'Category Management',
    },
  },
  {
    path: 'post-manage',
    component: PostManagementComponent,
    data: {
      title: 'Post Management',
    },
  },
  {
    path: 'service-manage',
    component: ServiceManagementComponent,
    data: {
      title: 'Service Management',
    },
  },
  {
    path: 'service-booking-manage',
    component: ServiceBookingManagementComponent,
    data: {
      title: 'ServiceBooking Management',
    },
  },
  {
    path: 'feedback-manage',
    component: FeedbackManagementComponent,
    data: {
      title: 'Feedback Management',
    },
  },
  {
    path: 'payment-manage',
    component: PaymentManagementComponent,
    data: {
      title: 'Payment Management',
    },
  },
];
