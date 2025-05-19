import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Account } from "../models/account.type";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>('http://localhost:3000/platforms/');
  }

  getList() {
    return this.http.get<Account[]>('http://localhost:3000/accounts');
  }

  remove(account: Account) {
    return this.http.delete<Account>(`http://localhost:3000/accounts/${account.id}`);
  }
}
