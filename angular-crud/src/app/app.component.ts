import { Component } from '@angular/core';
import {OfferService} from "./core/services/offer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-crud';

  constructor(private offerService: OfferService) {}

  getAll(): void {
    this.offerService.getAll().subscribe(console.log);
  }
}
