import { Component, input, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie',
  imports: [LottieComponent],
  templateUrl: './lottie.component.html',
  styleUrl: './lottie.component.scss'
})
export class LottieLogoComponent implements OnInit {

  path = input.required<string>()

  options!: AnimationOptions;
  
  ngOnInit(){
   this.options =  {
    path: this.path(),
    loop: false,
    autoplay: true
  }
  }

  
}
