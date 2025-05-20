import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  name: string;
  type: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly API_URL = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API_URL}/${id}`);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.API_URL, category);
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.API_URL}/${category.id}`, category);
  }

  remove(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.API_URL}/${category.id}`);
  }
}
