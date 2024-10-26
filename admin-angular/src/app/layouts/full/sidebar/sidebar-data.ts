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
    iconName: 'users',
    route: '/user-management/list',
  },
  {
    displayName: 'Category List',
    iconName: 'category',
    route: '/category-management/list',
  },
  {
    displayName: 'Post List',
    iconName: 'file-text',
    route: '/post-management/list',
  },
  {
    displayName: 'Service List',
    iconName: 'layout-navbar-expand',
    route: '/service-management/list',
  },
  {
    displayName: 'Feedback List',
    iconName: 'messages',
    route: '/feedback-management/list',
  },
  {
    displayName: 'Payment List',
    iconName: 'credit-card',
    route: '/payment-management/list',
  },
];