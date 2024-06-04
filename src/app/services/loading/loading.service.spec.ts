import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isLoading$', () => {
    it('should initially be false', (done) => {
      service.isLoading$
        .subscribe((value) => {
          expect(value).toBe(false);
          done();
        });
    });

    it('should emit true after setLoadingState(true) is called', (done) => {
      service.setLoadingState(true);

      service.isLoading$
        .subscribe((value) => {
          expect(value).toBe(true);
          done();
        });
    });

    it('should emit false after setLoadingState(false) is called', (done) => {
      service.setLoadingState(false);

      service.isLoading$
        .subscribe((value) => {
          expect(value).toBe(false);
          done();
        });
    });
  });
});
