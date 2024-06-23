import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // check if request URL contains specific API URL
  if (req.url.includes(environment.apiUrl)) {
    const clonedRequest = req.clone({
      // params: req.params.set('apiKey', environment.apiKey),
    });
    return next(clonedRequest);
  }
  // for other requests, don't modify them
  return next(req);
};
