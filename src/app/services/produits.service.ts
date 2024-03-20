import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../model/protuit';


@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  private apiUrl = 'http://localhost:3333/produits';
  private apiUrl1 = 'http://localhost:3333/categorie';
  constructor(private http: HttpClient) {}

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  updateProduit(produit: Produit): Observable<Produit> {
    const url = `${this.apiUrl}/${produit.id}`;
    return this.http.put<Produit>(url, produit);
  }

  deleteProduit(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}