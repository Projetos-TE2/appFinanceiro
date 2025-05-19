import { Component, OnInit } from '@angular/core';
import { Transaction } from './models/transaction.type';
import { TransactionService } from './services/transaction.service';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: false,
})
export class TransactionsPage implements OnInit, ViewWillEnter,
  ViewDidEnter, ViewWillLeave, ViewDidLeave {

  transactionsList: Transaction[] = [];

  constructor(
    private transactionService: TransactionService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  getValorClass(price: string | number): string {
    return Number(price) >= 0 ? 'valor-positivo' : 'valor-negativo';
  }

  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');
    this.transactionService.getList().subscribe({
      next: (response: Transaction[]) => {
        this.transactionsList = response;
      },
      error: (error: any) => {
        alert('Erro ao carregar lista de transações');
        console.error(error);
      }
    });
  }

  ngOnInit() { }

  remove(transaction: Transaction) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão da transação "${transaction.title}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.transactionService.remove(transaction).subscribe({
              next: (response: Transaction) => {
                this.transactionsList = this.transactionsList.filter(t => t.id !== response.id);
                this.toastController.create({
                  message: `Transação "${transaction.title}" excluída com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error: any) => {
                alert('Erro ao excluir a transação ' + transaction.title);
                console.error(error);
              }
            });
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }
}
