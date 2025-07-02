import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [NgbCollapseModule, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  router = inject(Router)
  authService = inject(AuthService)

  collapse = signal<boolean>(true);
  isMenuCollapsed = computed(() => this.collapse());

  toggleMenu() {
    this.collapse.update(current => !current);
  }

  login() {
    this.authService.login()
  }

  logout() {
    this.authService.logout()
  }
}
