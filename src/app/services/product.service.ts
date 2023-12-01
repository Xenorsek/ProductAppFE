import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProductModel } from '../models/product.model';
import { Observable, catchError, throwError } from 'rxjs';
import { Products } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:44354/api/product';

  constructor(private http: HttpClient) { }

  getProducts(pageNumber: number, pageSize: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
      catchError((error) => {
        console.error('Błąd połączenia, sprawdź konfigurację portów.', error);
        return throwError(() => new Error('Błąd połączenia, sprawdź konfigurację portów. W miejscu src/app/services/product.service.ts należy zmodyfikować url pod naszą aplikację backendową'));
      })
    );
  }

  createProduct(product: CreateProductModel): Observable<CreateProductModel> {
    return this.http.post<CreateProductModel>(this.apiUrl, product);
  }
}
