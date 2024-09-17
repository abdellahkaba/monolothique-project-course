import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from '../keycloak/keycloak.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);
  const token = keycloakService.keycloak?.token; // Accéder au token depuis Keycloak

  if (token) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
    return next(authReq);
  }
  return next(req);
};

