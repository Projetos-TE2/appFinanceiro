import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private dataChanged = new BehaviorSubject<boolean>(false);
  dataChanged$ = this.dataChanged.asObservable();

  notifyDataChanged() {
    this.dataChanged.next(true);
    // Reset após notificar para permitir múltiplas notificações do mesmo evento
    setTimeout(() => this.dataChanged.next(false), 0);
  }

  forceUpdate() {
    this.dataChanged.next(true);
  }
} 