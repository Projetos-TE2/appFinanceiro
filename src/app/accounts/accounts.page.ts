import { Component, OnInit, OnDestroy } from '@angular/core';
import { Account } from '../transactions/models/account.type';
import { AccountService } from '../transactions/services/account.service';
import { AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: false,
})
export class AccountsPage implements OnInit, OnDestroy {
  accountsList: Account[] = [];
  private dataChangedSubscription: Subscription;

  constructor(
    private accountService: AccountService,
    private alertController: AlertController,
    private toastController: ToastController,
    private eventService: EventService
  ) {
    this.dataChangedSubscription = this.eventService.dataChanged$.subscribe((changed) => {
      if (changed) {
        this.loadAccounts();
      }
    });
  }

  ngOnDestroy() {
    if (this.dataChangedSubscription) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

  ionViewDidEnter() {
    this.eventService.forceUpdate();
  }

  trackById(index: number, item: Account) {
    return item.id;
  }

  loadAccounts() {
    this.accountService.getList().subscribe({
      next: (response: Account[]) => {
        this.accountsList = response;
      },
      error: (error: any) => {
        this.toastController.create({
          message: 'Erro ao carregar lista de contas',
          duration: 2000,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }

  remove(account: Account) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão da conta "${account.name}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.accountService.remove(account).subscribe({
              next: () => {
                this.accountsList = this.accountsList.filter(a => a.id !== account.id);
                this.toastController.create({
                  message: `Conta "${account.name}" excluída com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error: any) => {
                this.toastController.create({
                  message: 'Erro ao excluir a conta ' + account.name,
                  duration: 2000,
                  color: 'danger'
                }).then(t => t.present());
              }
            });
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }

  ngOnInit() {
    this.loadAccounts();
  }
}
