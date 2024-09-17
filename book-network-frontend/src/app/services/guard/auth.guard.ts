import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  // Vérification si 'keycloak' et 'isTokenExpired' existent
  if (keycloakService.keycloak?.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }

  return true;
};

