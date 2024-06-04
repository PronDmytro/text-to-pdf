import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';

import { apiKeyInterceptor } from './api-key.interceptor';

describe('apiKeyInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiKeyInterceptor(req, next));

  let nextSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    nextSpy = jasmine.createSpy().and.callFake((req: HttpRequest<unknown>): Observable<HttpResponse<unknown>> => of(new HttpResponse(req)));
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add api key to request params if request URL is for specific API', (done) => {
    const req = new HttpRequest<unknown>('GET', `${environment.apiUrl}/create-pdf`);
    const interceptorFn: HttpInterceptorFn = (req, next) => apiKeyInterceptor(req, next);

    interceptorFn(req, nextSpy)
      .subscribe({
        next: () => {
          const spiedRequest = nextSpy.calls.argsFor(0)[0];
          expect(spiedRequest.params.get('apiKey')).toBe(environment.apiKey);
          done();
        },
        error: done.fail,
      });
  });

  it('should not modify request params for other requests', (done) => {
    const req = new HttpRequest<unknown>('GET', 'http://dummyurl.com');
    const interceptorFn: HttpInterceptorFn = (req, next) => apiKeyInterceptor(req, next);

    interceptorFn(req, nextSpy).subscribe({
      next: () => {
        const spiedRequest = nextSpy.calls.argsFor(0)[0];
        expect(spiedRequest.params.get('apiKey')).toBeNull();
        done();
      },
      error: done.fail,
    });
  });

});
