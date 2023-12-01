import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { ProductService } from '../../services/product.service';
import { CreateProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {
  isCreating: Boolean = false;

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    price: [0, [Validators.required, Validators.pattern(/^\d+\.?\d{0,2}$/), Validators.min(0), Validators.max(99999)]],
    code: ['', [Validators.required, Validators.maxLength(100)]]
  });

  constructor(public formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isCreating = true;

      let product = new CreateProductModel(
        this.productForm.value.name!,
        this.productForm.value.price!,
        this.productForm.value.code!
      );
      this.productService.createProduct(product).subscribe(response => {
        window.location.reload();

      },
      error => {
        console.log("Something went wrong" + error);
      }
      );
    }
  }
}