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
    navCap: 'User Management', // Nhóm quản lý người dùng
  },
  {
    displayName: 'User List',
    iconName: 'users',
    route: '/user-management/list', // Đường dẫn đến danh sách người dùng
  },

];
