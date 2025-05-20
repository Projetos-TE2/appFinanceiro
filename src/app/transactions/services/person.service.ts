import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.type';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private readonly API_URL = 'http://localhost:3000/people';

  constructor(private http: HttpClient) { }

  getList(): Observable<Person[]> {
    return this.http.get<Person[]>(this.API_URL);
  }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.API_URL}/${id}`);
  }

  create(person: Person): Observable<Person> {
    return this.http.post<Person>(this.API_URL, person);
  }

  update(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.API_URL}/${person.id}`, person);
  }

  remove(person: Person): Observable<Person> {
    return this.http.delete<Person>(`${this.API_URL}/${person.id}`);
  }
}
