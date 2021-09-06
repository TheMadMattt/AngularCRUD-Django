import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfferListComponent} from "./pages/offer-list/offer-list.component";
import {CreateOfferComponent} from "./pages/create-offer/create-offer.component";
import {OfferDetailComponent} from "./pages/offer-detail/offer-detail.component";

const routes: Routes = [
  {
    path: '', component: OfferListComponent,
  },
  {
    path: 'create', component: CreateOfferComponent
  },
  {
    path: 'detail/:id', component: OfferDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
