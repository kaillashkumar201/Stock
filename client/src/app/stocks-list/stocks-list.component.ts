import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../stock';
import { StockService } from '../stock.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stocks-list',
  template: `
    <h2 class="text-center m-5">Stock Register Database<br>
    <button class="btn btn-primary me-1 x" (click)="fetchStocks()">All Stocks</button></h2>
    <label for="inp">Search: </label>
    <input type="text" id="inp">
    <button class="btn btn-primary me-1 x" (click)="fetchStocksByYear()">Find by year</button>
    <button class="btn btn-primary me-1 x" (click)="fetchStocksByVolume()">Find by volume</button>
    <button class="btn btn-primary me-1 x" (click)="fetchStocksByInvoice()">Find by invoice</button>
    <button class="btn btn-primary me-1 x" (click)="fetchStocksByName()">Find by name</button>
    <br>
    <table class="table table-striped table-bordered" style="margin-left:-40px;width:110%;">
        <thead>
            <tr>
                <th>Volume No</th>
                <th>Page No</th>
                <th>Serial No</th>
                <th>Name</th>
                <th style="width: 300px; text-align: center;">Description</th>
                <th>Date of Purchase</th>
                <th>Purchase Value</th>
                <th>Year</th>
                <th>Transfer</th>
                <th>Invoice No</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let stock of stocks$ | async">
                <td>{{stock.v_no}}</td>
                <td>{{stock.p_no}}</td>
                <td>{{stock.s_no}}</td>
                <td>{{stock.name}}</td>
                <td class="d" id='table_desc' >{{stock.desc}}</td>
                <td>{{stock.datePurchase}}</td>
                <td>{{stock.purchaseValue}}</td>
                <td>{{stock.year}}</td>
                <td>{{stock.transfer}}</td>
                <td>{{stock.invoice_no}}</td>
                <td>
                    <button class="btn btn-primary me-1" [routerLink]="['edit/', stock._id]">Edit</button>
                    <button class="btn btn-danger" (click)="deleteStock(stock._id || '')">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Stock</button>

  `,
  styles: [
    `
    button.x
    {
      margin:15px; 
    }
    .d{
      display: flex;
      /* word-wrap: break-word; */
      overflow-y: auto;
      height:100px;
      /* max-height: fit-content;  */
      /* max-width: 400px; */
      width:300px;
      /* overflow-wrap: break-word; */
      font-size: 14px;
      /* padding-left: 15px !important; */
      /* margin: 10px; */
    }
    th{
      text-align: center; 
    }


    `
  ]
})
export class StocksListComponent implements OnInit {

  stocks$: Observable<Stock[]> = new Observable();

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.fetchStocks();
  }

  deleteStock(id: string): void {
    if(window.confirm("Are your sure?")){
      this.stockService.deleteStock(id).subscribe({
        next: () => this.fetchStocks()
      });
    }
  }

  fetchStocks(): void {
    this.stocks$ = this.stockService.getStocks();
    //this.stockService.getStocks().subscribe({next:stocks => this.stocks = stocks});
  }

  fetchStocksByYear(): void{
    let yr: string= (<HTMLInputElement>document.getElementById("inp")).value as string;
    this.stocks$= this.stockService.getStocksByYear(yr);
    console.log("By year inputs: \n" +this.stocks$);
  }

  fetchStocksByVolume(): void{
    let vol: string= (<HTMLInputElement>document.getElementById("inp")).value as string;
    this.stocks$= this.stockService.getStocksByVolume(vol);
    console.log("By volume inputs: \n" +this.stocks$);
  }

  fetchStocksByInvoice(): void{
    let inv: string= (<HTMLInputElement>document.getElementById("inp")).value as string;
    this.stocks$= this.stockService.getStocksByInvoice(inv);
    console.log("By invoice inputs: \n" +this.stocks$);
  }

  fetchStocksByName(): void{
    let nam: string= (<HTMLInputElement>document.getElementById("inp")).value as string;
    this.stocks$= this.stockService.getStocksByName(nam);
    console.log("By invoice inputs: \n" +this.stocks$);
  }

}
