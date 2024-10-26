import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { AuthService } from '../../../services/auth.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
}