import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferListComponent } from './pages/offer-list/offer-list.component';
import {OfferRoutingModule} from "./offer-routing.module";
import { AddEditOfferComponent } from './pages/add-edit-offer/add-edit-offer.component';
import {SharedModule} from "../../shared/shared.module";
import { OffersTableComponent } from './components/offers-table/offers-table.component';
import { OfferDetailComponent } from './pages/offer-detail/offer-detail.component';



@NgModule({
  declarations: [
    OfferListComponent,
    AddEditOfferComponent,
    OffersTableComponent,
    OfferDetailComponent
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,
    SharedModule
  ]
})
export class OfferModule { }
