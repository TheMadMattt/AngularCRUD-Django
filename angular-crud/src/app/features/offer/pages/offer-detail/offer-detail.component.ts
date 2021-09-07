import { Component, OnInit } from '@angular/core';
import {OfferService} from "../../../../core/services/offer.service";
import {Observable} from "rxjs";
import {Offer} from "../../../../core/models/Offer";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offer$!: Observable<Offer>;
  offerId!: number;

  constructor(private offerService: OfferService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.offerId = this.route.snapshot.params.id;
    this.offer$ = this.offerService.get(this.offerId);
  }

  goBack() {
    this.location.back()
  }
}
