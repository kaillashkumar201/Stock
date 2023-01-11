import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Stock } from './stock';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private url = 'http://localhost:5200';
  private stocks$: Subject<Stock[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshStocks() {
    this.httpClient.get<Stock[]>(`${this.url}/stocks`)
      .subscribe(Stocks => {
        this.stocks$.next(Stocks);
      });
  }

  getStocks(): Subject<Stock[]> {
    this.refreshStocks();
    return this.stocks$;
  }


  getStock(id: string): Observable<Stock> {
    return this.httpClient.get<Stock>(`${this.url}/stocks/${id}`);
  }

  createStock(stock: Stock): Observable<string> {
    return this.httpClient.post(`${this.url}/stocks`, stock, { responseType: 'text' });
  }

  updateStock(id: string, stock: Stock): Observable<string> {
    return this.httpClient.put(`${this.url}/stocks/${id}`, stock, { responseType: 'text' });
  }

  deleteStock(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/stocks/${id}`, { responseType: 'text' });
  }


  getStocksByYear(yr: string): Subject<Stock[]> {
    this.httpClient.get<Stock[]>(`${this.url}/stocks/year/${yr}`)
      .subscribe(Stocks => {
        this.stocks$.next(Stocks);
      });

    return this.stocks$;
  }

  getStocksByVolume(vol: string): Subject<Stock[]> {
    this.httpClient.get<Stock[]>(`${this.url}/stocks/volume/${vol}`)
      .subscribe(Stocks => {
        this.stocks$.next(Stocks);
      });

    return this.stocks$;
  }

  getStocksByInvoice(inv: string): Subject<Stock[]> {
    this.httpClient.get<Stock[]>(`${this.url}/stocks/invoice/${inv}`)
      .subscribe(Stocks => {
        this.stocks$.next(Stocks);
      });

    return this.stocks$;
  }

  getStocksByName(nam: string): Subject<Stock[]> {
    this.httpClient.get<Stock[]>(`${this.url}/stocks/name/${nam}`)
      .subscribe(Stocks => {
        this.stocks$.next(Stocks);
      });

    return this.stocks$;
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(() => err.error() || 'Server error');
  }
}
