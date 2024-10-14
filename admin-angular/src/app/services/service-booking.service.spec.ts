import { TestBed } from '@angular/core/testing';

import { ServiceBookingService } from './service-booking.service';

describe('ServiceBookingService', () => {
  let service: ServiceBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
