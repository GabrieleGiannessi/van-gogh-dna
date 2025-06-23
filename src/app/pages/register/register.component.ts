import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  databaseService = inject(DatabaseService)
  router = inject(Router);

  isRegistrating = signal<boolean>(false);

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  completeRegistration() {
    // Fa la chiamata al db per la registrazione dell'utente
    this.isRegistrating.set(true);
    if (this.registerForm.invalid) {
      console.error('Form is invalid');
      this.isRegistrating.set(false);
      return;
    }
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      console.error('Passwords do not match'); //prossimamente aggiungere toast message
      this.isRegistrating.set(false);
      return;
    } 
    const { username, email, password } = this.registerForm.value;
    this.databaseService.registerUser(email, password, username).subscribe({
      next: () => {
        this.isRegistrating.set(false);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.isRegistrating.set(false);
        console.error('Error registering user', err); //toast message
      }
    });
  }

}
