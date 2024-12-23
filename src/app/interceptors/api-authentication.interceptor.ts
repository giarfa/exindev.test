import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_AUTHORIZATION, API_BASE_URL } from '../providers';

export const apiAuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const apiBaseUrl = inject(API_BASE_URL);
  const apiAuthorization = inject(API_AUTHORIZATION);

  if (req.url.includes(apiBaseUrl) && apiAuthorization) {
    req = req.clone({
      setHeaders: {
        Authorization: apiAuthorization
      }
    });
  }

  return next(req);
};
