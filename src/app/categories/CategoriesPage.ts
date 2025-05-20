import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './CategoriesPage.html',
  styleUrls: ['./CategoriesPage.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class CategoriesPage implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadCategories();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  loadCategories() {
    this.http.get<any[]>('http://localhost:3000/categories')
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: () => {
          // Adicione um toast ou alert se desejar feedback visual
        }
      });
  }

  remove(category: any) {
    this.http.delete(`http://localhost:3000/categories/${category.id}`)
      .subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== category.id);
        },
        error: () => {
          // Adicione um toast ou alert se desejar feedback visual
        }
      });
  }

  getCategoryIcon(category: any): string {
    if (category.name?.toLowerCase().includes('aliment')) {
      return 'fast-food-outline';
    }
    if (category.name?.toLowerCase().includes('transporte')) {
      return 'car-outline';
    }
    if (category.name?.toLowerCase().includes('moradia')) {
      return 'home-outline';
    }
    if (category.name?.toLowerCase().includes('lazer')) {
      return 'game-controller-outline';
    }
    if (category.name?.toLowerCase().includes('receita')) {
      return 'cash-outline';
    }
    if (category.name?.toLowerCase().includes('despesa')) {
      return 'card-outline'; // Ícone para despesa
    }
    return 'pricetag-outline'; // padrão
  }
}
