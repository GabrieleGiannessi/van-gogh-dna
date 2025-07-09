import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const modifyGuard: CanActivateFn = async (route, state) => {
  const databaseService = inject(DatabaseService);
  const authService = inject(AuthService);

  const doc_id = route.params['id'];

  await authService.oAuthService.loadDiscoveryDocumentAndTryLogin();

  try {
    const docs = await firstValueFrom(
      databaseService.getDocsBySubject(authService.subject())
    );

    return docs.some(doc => doc.doc_id === doc_id);
  } catch (error) {
    return false;
  }
};
