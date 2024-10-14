import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBookingManagementComponent } from './service-booking-management.component';

describe('ServiceBookingManagementComponent', () => {
  let component: ServiceBookingManagementComponent;
  let fixture: ComponentFixture<ServiceBookingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceBookingManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceBookingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
