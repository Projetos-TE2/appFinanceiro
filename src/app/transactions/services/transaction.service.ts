import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly API_URL = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) { }

  getList(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL);
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.API_URL}/${id}`);
  }

  create(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.API_URL, transaction);
  }

  update(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.API_URL}/${transaction.id}`, transaction);
  }

  remove(transaction: Transaction): Observable<Transaction> {
    return this.http.delete<Transaction>(`${this.API_URL}/${transaction.id}`);
  }
}
