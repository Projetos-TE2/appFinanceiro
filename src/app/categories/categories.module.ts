import { CategoriesPage } from './CategoriesPage';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoriesPageRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './category-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    CategoriesPage,
    CategoryFormComponent
  ],
})
export class CategoriesPageModule {}
