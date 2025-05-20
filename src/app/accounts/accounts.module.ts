import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AccountsPage } from './accounts.page';
import { RouterModule, Routes } from '@angular/router';
import { AccountFormComponent } from './account-form.component';

const routes: Routes = [
  { path: '', component: AccountsPage },
  { path: 'new', component: AccountFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    AccountFormComponent // Importa como standalone
  ],
  declarations: [
    AccountsPage
  ],
  exports: [
    AccountsPage
  ]
})
export class AccountsModule { }
