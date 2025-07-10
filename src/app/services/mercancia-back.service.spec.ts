import { TestBed } from '@angular/core/testing';

import { MercanciaBackService } from './mercancia-back.service';

describe('MercanciaBackService', () => {
  let service: MercanciaBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercanciaBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
