import { Component, OnInit } from '@angular/core';
import { GameService } from '../games/services/game.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, ViewWillEnter {
  saldoTotal: number = 0;
  totalReceitas: number = 0;
  totalDespesas: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.atualizarSaldos();
  }

  private atualizarSaldos() {
    this.gameService.getList().subscribe(transactions => {
      this.totalReceitas = transactions
        .filter(t => t.category === 'Receita')
        .reduce((total, t) => total + Number(t.price), 0);

      this.totalDespesas = Math.abs(transactions
        .filter(t => t.category === 'Despesa')
        .reduce((total, t) => total + Number(t.price), 0));

      this.saldoTotal = this.totalReceitas - this.totalDespesas;
    });
  }
}
