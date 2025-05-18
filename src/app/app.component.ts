import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home'},
    { title: 'Transações', url: '/games', icon: 'cash' },
    { title: 'Categorias', url: '/studios', icon: 'folder' },
  ];

  constructor() {}
}
