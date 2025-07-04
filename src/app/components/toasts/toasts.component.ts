import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toasts',
  imports: [NgbToastModule, CommonModule],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss'
})
export class ToastsComponent {
  readonly toastService = inject(ToastService);
}
