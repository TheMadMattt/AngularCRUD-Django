import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Offer} from "../../../../core/models/Offer";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, of} from "rxjs";
import {Category} from "../../../../core/models/Category";
import {CategoryService} from "../../../../core/services/category.service";
import {FormControl} from "@angular/forms";
import {OfferService} from "../../../../core/services/offer.service";
import {switchMap} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-offers-table',
  templateUrl: './offers-table.component.html',
  styleUrls: ['./offers-table.component.scss']
})
export class OffersTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['position', 'title', 'description', 'price', 'category', 'created', 'action'];

  @Input()
  offers: Offer[] = [];
  categories$!: Observable<Category[]>;

  dataSource!: MatTableDataSource<Offer>;

  categoryFormControl = new FormControl(null);

  constructor(private categoryService: CategoryService,
              private offerService: OfferService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.offers);
    this.categories$ = this.categoryService.getAll();

    this.categoryFormControl.valueChanges.pipe(
      switchMap((category: number[]) => {
        const categories = category.join(',');
        return this.offerService.filterByCategory(categories);
      })
    ).subscribe((data: Offer[]) => {
      this.dataSource.data = data;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteOffer(offer: Offer): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: offer
    }).afterClosed().pipe(
      switchMap(isConfirmed => {
        if (isConfirmed) {
          return this.offerService.deleteOffer(offer.id).pipe(
            switchMap((resp: HttpResponse<any>) => {
              if (resp.ok) {
                const categories = this.categoryFormControl.value?.join(',');
                return this.offerService.filterByCategory(categories ? categories : '')
              }
              return of(null);
            })
          )
        }
        return of(null);
      })
    ).subscribe((data) => {
      if (data) {
        this.dataSource.data = data;
      }
    });
  }
}
