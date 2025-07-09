import { Component, inject, input, ViewChild } from '@angular/core';
import { Toast, ToastService } from '../../services/toast.service';
import { NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-toast',
  imports: [NgbToastModule, CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  toastService = inject(ToastService)

  toast = input.required<Toast>()
  @ViewChild('Toast') ToastElement!: NgbToast

  hide() {
    this.ToastElement.hide()
  }

}
