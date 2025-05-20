import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsPageRoutingModule } from './transactions-routing.module';

import { TransactionsPage } from './transactions.page';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { MaskitoDirective } from '@maskito/angular';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from 'src/app/categories/category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsPageRoutingModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    TransactionsPage,
    TransactionFormComponent,
  ],
  providers: [CategoryService]
})
export class TransactionsPageModule {}
