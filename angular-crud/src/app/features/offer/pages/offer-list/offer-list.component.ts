import { Component, OnInit } from '@angular/core';
import {OfferService} from "../../../../core/services/offer.service";
import {CategoryService} from "../../../../core/services/category.service";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offers: any[] = [];

  constructor(private offerService: OfferService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.offerService.getAll().subscribe((data: any[]) => {
      this.offers = data;
    })
  }

}
