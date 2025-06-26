import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [NgbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  authService = inject(AuthService);
  router = inject(Router)

  collapse = signal<boolean>(true);
  isMenuCollapsed = computed(() => this.collapse());
  isLogged = computed(() => this.authService.currAccessToken() != null)

  toggleMenu() {
    this.collapse.update(current => !current);
  }

  logout() {
    this.authService.logout()
  }
}
