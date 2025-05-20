import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from './models/transaction.type';
import { TransactionService } from './services/transaction.service';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: false,
})
export class TransactionsPage implements OnInit, OnDestroy, ViewWillEnter,
  ViewDidEnter, ViewWillLeave, ViewDidLeave {

  transactionsList: Transaction[] = [];
  private dataChangedSubscription: Subscription;

  constructor(
    private transactionService: TransactionService,
    private alertController: AlertController,
    private toastController: ToastController,
    private eventService: EventService
  ) {
    this.dataChangedSubscription = this.eventService.dataChanged$.subscribe((changed) => {
      if (changed) {
        this.loadTransactions();
      }
    });
  }

  ngOnDestroy() {
    if (this.dataChangedSubscription) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

  loadTransactions() {
    this.transactionService.getList().subscribe({
      next: (response: Transaction[]) => {
        this.transactionsList = response;
      },
      error: (error: any) => {
        this.toastController.create({
          message: 'Erro ao carregar lista de transações',
          duration: 2000,
          color: 'danger'
        }).then(t => t.present());
        console.error(error);
      }
    });
  }

  ionViewWillEnter() {
    this.loadTransactions();
  }

  ionViewDidEnter() {
    this.eventService.forceUpdate();
  }

  ngOnInit() {
    this.loadTransactions();
  }

  getValorClass(price: string | number): string {
    return Number(price) >= 0 ? 'valor-positivo' : 'valor-negativo';
  }

  getTransactionIcon(transaction: any): string {
    const title = (transaction.title || '').toLowerCase();
    if (transaction.category === 'Receita') {
      return 'cash-outline';
    }
    if (transaction.category === 'Despesa') {
      if (title.includes('aluguel') || title.includes('moradia')) {
        return 'home-outline';
      }
      if (title.includes('luz') || title.includes('energia')) {
        return 'flash-outline';
      }
      if (title.includes('carro') || title.includes('auto') || title.includes('veículo')) {
        return 'car-outline';
      }
      return 'card-outline'; // Ícone padrão para despesa
    }
    return 'swap-horizontal-outline';
  }

  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }

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

  trackById(index: number, item: Transaction) {
    return item.id;
  }

  trackByAccountId(index: number, item: any) {
    return item.id;
  }
}
