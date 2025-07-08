import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const docsGuard: CanActivateFn = async (route, state) => {
  const authservice = inject(AuthService);
  const router = inject(Router);
  const sub = route.params["sub"];

  await authservice.oAuthService.loadDiscoveryDocumentAndTryLogin();
  if (authservice.subject() === sub) {
    return true;
  }

  router.navigateByUrl('/home');
  return false;
};
