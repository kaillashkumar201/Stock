import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from '../stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-add-stock',
  template: `
    <h2 class="text-center m-5">Add a New Stock</h2>
    <app-stock-form (formSubmitted)="addStock($event)"></app-stock-form>
  `
})
export class AddStockComponent{

  constructor(private router: Router, private stockService: StockService) { }

  addStock(stock: Stock) {
    this.stockService.createStock(stock)
      .subscribe({
        next: () => {
          this.router.navigate(['/stocks']);
        },
        error: (error) => {
          alert("Failed to create stock");
          console.error(error);
        }
      });
  }

}

