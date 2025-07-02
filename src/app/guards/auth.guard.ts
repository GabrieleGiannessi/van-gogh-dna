import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop'

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = await firstValueFrom(toObservable(authService.isLogged));
  return isLogged ? true : router.createUrlTree(['/home']);
};
