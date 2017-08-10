import { TestBed, inject } from '@angular/core/testing';

import { NavserviceService } from './navservice.service';

describe('NavserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavserviceService]
    });
  });

  it('should be created', inject([NavserviceService], (service: NavserviceService) => {
    expect(service).toBeTruthy();
  }));
});
