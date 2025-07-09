import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-toasts',
  imports: [ToastComponent],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss'
})
export class ToastsComponent {
  readonly toastService = inject(ToastService);
}
