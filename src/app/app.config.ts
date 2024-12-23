import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideApiBaseUrl } from './providers';
import { apiAuthenticationInterceptor } from './interceptors/api-authentication.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiAuthenticationInterceptor])
    ),
    provideApiBaseUrl({
      url: 'https://mrkt-dsk.dev.exin.digital/api/v2/',
      authorization: 'User 1'
    })
  ]
};
