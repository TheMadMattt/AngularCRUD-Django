import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OfferService} from "../../../../core/services/offer.service";
import {CategoryService} from "../../../../core/services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../../../core/models/Category";

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  createOfferFb: FormGroup;
  categories$!: Observable<Category[]>;

  constructor(private fb: FormBuilder,
              private offerService: OfferService,
              private categoryService: CategoryService) {
    this.createOfferFb = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      category: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
  }

  onSubmit(): void {
    if (this.createOfferFb.invalid) {
      return;
    }

    let offer = this.createOfferFb.value;
    offer.price = offer.price*100.0;

    this.offerService.createOffer(offer).subscribe(console.log);
  }
}
