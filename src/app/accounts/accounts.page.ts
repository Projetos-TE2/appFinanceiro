import { Component, OnInit } from '@angular/core';
import { Account } from '../transactions/models/account.type';
import { AccountService } from '../transactions/services/account.service';
import { AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AccountsPage implements OnInit {
  accountsList: Account[] = [];

  constructor(
    private accountService: AccountService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getList().subscribe({
      next: (response: Account[]) => {
        this.accountsList = response;
      },
      error: (error: any) => {
        alert('Erro ao carregar lista de contas');
        console.error(error);
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
                alert('Erro ao excluir a conta ' + account.name);
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
