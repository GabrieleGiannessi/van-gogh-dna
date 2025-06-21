import { Component, input } from '@angular/core';
import { documentType } from '../../services/database.service';

@Component({
  selector: 'app-document-card',
  imports: [],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss'
})
export class DocumentCardComponent {
  document = input.required<documentType>();
}
