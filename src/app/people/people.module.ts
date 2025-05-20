import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PeoplePage } from './people.page';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './person-form.component';

const routes: Routes = [
  { path: '', component: PeoplePage },
  { path: 'new', component: PersonFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    PeoplePage,
    PersonFormComponent
  ]
})
export class PeopleModule { }
