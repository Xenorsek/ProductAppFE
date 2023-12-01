import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ProductCreateComponent } from '../product-create/product-create.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports:[CommonModule, FormsModule, ProductCreateComponent],
  standalone: true,
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalProducts: number = 0;
  showedProducts: number = 0;
  errorMessage: string | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.pageNumber, this.pageSize)
      .subscribe(response => {
        this.products = response.products
        this.totalProducts = response.totalProducts
        if(this.pageNumber == 1) {
          this.showedProducts = response.products.length;
        }
        else{
          this.showedProducts = this.pageSize * (this.pageNumber - 1) + response.products.length;
        }
      },
      error => {
        this.errorMessage = error.message;
      }
      );
  }

  changePageSize(): void {
    this.pageNumber = 1;
    this.loadProducts();
  }

  changePage(newPage: number): void {
    this.pageNumber = newPage;
    this.loadProducts();
  }
}
