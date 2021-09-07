import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OfferService} from "../../../../core/services/offer.service";
import {CategoryService} from "../../../../core/services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../../../core/models/Category";
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../../../../core/models/Offer";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-add-edit-offer',
  templateUrl: './add-edit-offer.component.html',
  styleUrls: ['./add-edit-offer.component.scss']
})
export class AddEditOfferComponent implements OnInit {
  createOfferFb: FormGroup;
  categories$!: Observable<Category[]>;
  isEditing = false;
  offerId = -1;

  constructor(private fb: FormBuilder,
              private offerService: OfferService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router) {
    this.createOfferFb = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      category: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.offerId = this.route.snapshot.params.id;
    if (this.offerId) {
      this.isEditing = true;
      this.offerService.get(this.offerId).subscribe((offer: Offer) => {
        this.createOfferFb.patchValue({ title: offer.title, description: offer.description, price: offer.price/100.0,
          category: offer.category.id });
      });
    }
    this.categories$ = this.categoryService.getAll();
  }

  onSubmit(): void {
    if (this.createOfferFb.invalid) {
      this.createOfferFb.markAllAsTouched()
      return;
    }

    const offerFormValue = this.createOfferFb.value;
    const offer = {
      title: offerFormValue.title,
      description: offerFormValue.description,
      price: offerFormValue.price*100.0,
      category: offerFormValue.category,
    }

    if (this.isEditing) {
      this.offerService.updateOffer(offer, this.offerId).pipe(
        finalize(() => this.router.navigate(['/offers']))
      ).subscribe(console.log);
    } else {
      this.offerService.createOffer(offer).pipe(
        finalize(() => this.router.navigate(['/offers']))
      ).subscribe(console.log);
    }
  }
}
