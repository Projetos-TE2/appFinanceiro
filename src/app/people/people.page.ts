import { Component, OnInit } from '@angular/core';
import { Person } from '../transactions/models/person.type';
import { PersonService } from '../transactions/services/person.service';
import { AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class PeoplePage implements OnInit {
  peopleList: Person[] = [];

  constructor(
    private personService: PersonService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getList().subscribe({
      next: (response: Person[]) => {
        this.peopleList = response;
      },
      error: (error: any) => {
        alert('Erro ao carregar lista de pessoas');
        console.error(error);
      }
    });
  }

  remove(person: Person) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão da pessoa "${person.name}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.personService.remove(person).subscribe({
              next: () => {
                this.peopleList = this.peopleList.filter(p => p.id !== person.id);
                this.toastController.create({
                  message: `Pessoa "${person.name}" excluída com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error: any) => {
                alert('Erro ao excluir a pessoa ' + person.name);
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
