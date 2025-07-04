import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie',
  imports: [LottieComponent],
  templateUrl: './lottie.component.html',
  styleUrl: './lottie.component.scss'
})
export class LottieLogoComponent {
  options: AnimationOptions = {
    path: '/assets/animations/Vangogh-logo.json',
    loop: false,
    autoplay: true
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
