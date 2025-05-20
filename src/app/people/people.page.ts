import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../transactions/models/person.type';
import { PersonService } from '../transactions/services/person.service';
import { AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class PeoplePage implements OnInit, OnDestroy {
  peopleList: Person[] = [];
  private dataChangedSubscription: Subscription;

  constructor(
    private personService: PersonService,
    private alertController: AlertController,
    private toastController: ToastController,
    private eventService: EventService
  ) {
    this.dataChangedSubscription = this.eventService.dataChanged$.subscribe((changed) => {
      if (changed) {
        this.loadPeople();
      }
    });
  }

  ngOnDestroy() {
    if (this.dataChangedSubscription) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

  loadPeople() {
    this.personService.getList().subscribe({
      next: (response: Person[]) => {
        this.peopleList = response;
      },
      error: (error: any) => {
        this.toastController.create({
          message: 'Erro ao carregar lista de pessoas',
          duration: 2000,
          color: 'danger'
        }).then(t => t.present());
        console.error(error);
      }
    });
  }

  ionViewDidEnter() {
    this.eventService.forceUpdate();
  }

  ngOnInit() {
    this.loadPeople();
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

  trackById(index: number, item: Person) {
    return item.id;
  }
}
