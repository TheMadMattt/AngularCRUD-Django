import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfferListComponent} from './features/offer/pages/offer-list/offer-list.component';

const routes: Routes = [
  {
    path: '', component: OfferListComponent
  },
  {
    path: 'offers',
    loadChildren: () => import('./features/offer/offer.module').then(m => m.OfferModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
