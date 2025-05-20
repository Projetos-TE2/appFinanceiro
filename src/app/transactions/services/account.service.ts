import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Account } from "../models/account.type";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly API_URL = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) {}

  getList(): Observable<Account[]> {
    return this.http.get<Account[]>(this.API_URL);
  }

  getById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.API_URL}/${id}`);
  }

  create(account: Account): Observable<Account> {
    return this.http.post<Account>(this.API_URL, account);
  }

  update(account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.API_URL}/${account.id}`, account);
  }

  remove(account: Account): Observable<Account> {
    return this.http.delete<Account>(`${this.API_URL}/${account.id}`);
  }
}
