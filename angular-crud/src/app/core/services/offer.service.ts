import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Offer} from "../models/Offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  apiUrl = environment.api + 'offers/'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(this.apiUrl);
  }

  get(id: number): Observable<Offer> {
    return this.httpClient.get<Offer>(this.apiUrl + id + '/');
  }

  filterByCategory(categories: string): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(this.apiUrl + '?category=' + categories);
  }

  createOffer(offer: any): Observable<Offer> {
    return this.httpClient.post<any>(this.apiUrl, offer);
  }

  updateOffer(offer: any, id: number): Observable<Offer> {
    return this.httpClient.put<any>(this.apiUrl + id + '/', offer);
  }

  deleteOffer(offerId: number): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + offerId + '/', { observe: 'response' });
  }
}
