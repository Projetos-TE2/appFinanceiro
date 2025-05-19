import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PeoplePage } from './people.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PeoplePage }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    PeoplePage // Importando como standalone
  ]
})
export class PeopleModule { }
