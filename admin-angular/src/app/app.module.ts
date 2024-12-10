import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserDialogComponent } from './pages/user-management/user-dialog/user-dialog.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';
import { CategoryDialogComponent } from './pages/category-management/category-dialog/category-dialog.component';
import { PostManagementComponent } from './pages/post-management/post-management.component';
import { PostDialogComponent } from './pages/post-management/post-dialog/post-dialog.component';
import { ServiceManagementComponent } from './pages/service-management/service-management.component';
import { ServiceDialogComponent } from './pages/service-management/service-dialog/service-dialog.component';
import { FeedbackManagementComponent } from './pages/feedback-management/feedback-management.component';
import { PaymentManagementComponent } from './pages/payment-management/payment-management.component';
import { LoginComponent } from './pages/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent, 
    HeaderComponent,
    BrandingComponent,
    UserDialogComponent,
    UserManagementComponent,
    CategoryManagementComponent,
    CategoryDialogComponent,
    PostManagementComponent,
    PostDialogComponent,
    ServiceManagementComponent,
    ServiceDialogComponent,
    FeedbackManagementComponent,
    PaymentManagementComponent,
    AppNavItemComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    RouterModule,
    MatSnackBarModule,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule {}
