import { TestBed } from '@angular/core/testing';

import { UiToggleService } from './ui-toggle.service';

describe('UiToggleService', () => {
  let service: UiToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
