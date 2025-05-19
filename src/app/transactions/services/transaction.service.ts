import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly API_URL = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) { }

  getById(transactionId: string) {
    return this.http.get<Transaction>(`${this.API_URL}/${transactionId}`);
  }

  getList() {
    return this.http.get<Transaction[]>(this.API_URL)
  }

  private add(transaction: Transaction) {
    return this.http.post<Transaction>(this.API_URL, transaction);
  }

  private update(transaction: Transaction) {
    return this.http.put<Transaction>(`${this.API_URL}/${transaction.id}`, transaction);
  }

  save(transaction: Transaction) {
    return transaction.id ? this.update(transaction) : this.add(transaction);
  }

  remove(transaction: Transaction) {
    return this.http.delete<Transaction>(`${this.API_URL}/${transaction.id}`);
  }
}
