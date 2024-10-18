import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Management', // Nhóm quản lý người dùng
  },
  {
    displayName: 'User List',
    iconName: 'users', // Ví dụ: 'fa-users' từ Font Awesome
    route: '/user-management/list',
  },
  {
    displayName: 'Category List',
    iconName: 'category', // Ví dụ: 'fa-list' từ Font Awesome hoặc 'category' từ Material Icons
    route: '/category-management/list',
  },
  {
    displayName: 'Post List',
    iconName: 'file-text', // Ví dụ: 'fa-file-alt' từ Font Awesome
    route: '/post-management/list',
  },
  {
    displayName: 'Service List',
    iconName: 'layout-navbar-expand', // Ví dụ: 'fa-cogs' từ Font Awesome
    route: '/service-management/list',
  },
  {
    displayName: 'Service Booking List',
    iconName: 'calendar-check', // Ví dụ: 'fa-calendar-check' từ Font Awesome
    route: '/service-booking-management/list',
  },
  {
    displayName: 'Feedback List',
    iconName: 'messages', // Ví dụ: 'fa-comments' từ Font Awesome
    route: '/feedback-management/list',
  },
  {
    displayName: 'Payment List',
    iconName: 'credit-card', // Ví dụ: 'fa-credit-card' từ Font Awesome
    route: '/payment-management/list',
  },

];
