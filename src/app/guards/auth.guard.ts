import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.oAuthService.hasValidAccessToken()) {
    return true;
  } else {
    router.navigateByUrl('home');
    return false;
  }
};
