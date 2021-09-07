import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfferListComponent} from "./pages/offer-list/offer-list.component";
import {AddEditOfferComponent} from "./pages/add-edit-offer/add-edit-offer.component";
import {OfferDetailComponent} from "./pages/offer-detail/offer-detail.component";

const routes: Routes = [
  {
    path: '', component: OfferListComponent,
  },
  {
    path: 'add', component: AddEditOfferComponent
  },
  {
    path: 'edit/:id', component: AddEditOfferComponent
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
