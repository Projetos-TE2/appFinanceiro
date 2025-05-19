import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './CategoriesPage.html',
  styleUrls: ['./CategoriesPage.scss'],
  standalone: false,
})
export class CategoriesPage implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any>('http://localhost:3000/categories')
      .subscribe(data => {
        this.categories = data;
      });
  }

  remove(category: any) {
    this.http.delete(`http://localhost:3000/categories/${category.id}`)
      .subscribe(() => {
        this.categories = this.categories.filter(c => c.id !== category.id);
      });
  }
}
