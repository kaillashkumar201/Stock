import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Stock } from '../stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-edit-stock',
  template: `
    <h2 style="margin: 20px ;text-align:center;font-size:45px;"><b>Edit a Stock</b></h2>
    <app-stock-form [initialState]="stock" (formSubmitted)="editStock($event)"></app-stock-form>
  `
})
export class EditStockComponent implements OnInit {

  stock: BehaviorSubject<Stock> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.stockService.getStock(id !).subscribe((stock) => {
      this.stock.next(stock);
    });
  }

  editStock(stock: Stock) {
    this.stockService.updateStock(this.stock.value._id || '', stock)
      .subscribe({
        next: () => {
          this.router.navigate(['/stocks']);
        },
        error: (error: any) => {
          alert('Failed to update stock');
          console.error(error);
        }
      })
  }

}
