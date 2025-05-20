import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsPage } from './transactions.page';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsPage
  },
  {
    path: 'new',
    component: TransactionFormComponent
  },
  {
    path: 'edit/:transactionId',
    component: TransactionFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsPageRoutingModule {}
