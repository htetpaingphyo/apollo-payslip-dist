import { TestBed } from '@angular/core/testing';

import { PayslipService } from './payslip.service';

describe('PayslipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayslipService = TestBed.get(PayslipService);
    expect(service).toBeTruthy();
  });
});
