import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => {
    throw new Error('API_BASE_URL is not provided');
  }
});

export const API_AUTHORIZATION = new InjectionToken<string>('API_AUTHORIZATION', {
  providedIn: 'root',
  factory: () => {
    throw new Error('API_AUTHORIZATION is not provided');
  }
});

type ApiBaseUrlOptions = {
  url: `https://${string}/`;
  authorization?: string;
}

/**
 * Provides the API base URL as an environment provider.
 *
 * @param url - The base URL of the API to be provided.
 * @returns An instance of `EnvironmentProviders` configured with the provided API base URL.
 */
export function provideApiBaseUrl(options: ApiBaseUrlOptions): EnvironmentProviders {
  const { url, authorization = '' } = options;
  return makeEnvironmentProviders([
    {
      provide: API_BASE_URL,
      useValue: url
    },
    {
      provide: API_AUTHORIZATION,
      useValue: authorization
    }
  ]);
}