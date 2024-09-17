import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import {provideToastr} from "ngx-toastr";
import {KeycloakService} from "./services/keycloak/keycloak.service";
export function kcFactory(kcService: KeycloakService){
    return () => kcService.init()
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideToastr({
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
      tapToDismiss: true,
      positionClass: 'toast-bottom-right',
      timeOut: 8000
    }),
    provideHttpClient(
      withInterceptors(
      [
        httpTokenInterceptor
      ])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    }
  ]
};
