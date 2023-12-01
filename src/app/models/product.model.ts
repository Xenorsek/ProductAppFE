export interface Product {
    id: number;
    code: string;
    name: string;
    price: number;
  }

  export class CreateProductModel {
    constructor(
      public name: string,
      public price: number,
      public code: string
    ){}
  }