import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AccountsPage } from './accounts.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AccountsPage }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    AccountsPage // Importando como standalone
  ]
})
export class AccountsModule { }
