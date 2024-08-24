import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  private apiUrl = 'https://bold-fe-api.vercel.app/api';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<{ data: Transaction[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}
