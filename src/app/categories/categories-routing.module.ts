import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './CategoriesPage';
import { CategoryFormComponent } from './category-form.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },
  {
    path: 'new',
    component: CategoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}