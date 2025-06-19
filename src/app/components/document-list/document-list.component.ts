import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-list',
  imports: [],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {

    route = inject(ActivatedRoute);
    search = signal<string>('');
    constructor() {
    this.route.queryParamMap.subscribe(params => {
      const search = params.get('s');
      if(search) this.search.set(search);
      });

  }
}
