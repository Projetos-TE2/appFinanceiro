import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransactionService } from '../transactions/services/transaction.service';
import { Transaction } from '../transactions/models/transaction.type';
import { ViewWillEnter } from '@ionic/angular';
declare var Chart: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit {
  saldoTotal = 0;
  totalReceitas = 0;
  totalDespesas = 0;
  today = new Date();
  chart: any;

  // Exemplo de dados para o gráfico de linhas
  chartLabels: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  chartReceitas: number[] = [1200, 1500, 1800, 2000, 2100, 2500, 2300, 2200, 2100, 2000, 1900, 1800];
  chartDespesas: number[] = [800, 900, 1000, 1200, 1100, 1300, 1250, 1200, 1150, 1100, 1050, 1000];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.atualizarSaldos();
  }

  ngAfterViewInit() {
    this.renderLineChart();
  }

  private atualizarSaldos() {
    this.transactionService.getList().subscribe((transactions: Transaction[]) => {
      this.totalReceitas = transactions
        .filter((t: Transaction) => t.category === 'Receita')
        .reduce((total: number, t: Transaction) => total + Number(t.price), 0);

      this.totalDespesas = Math.abs(transactions
        .filter((t: Transaction) => t.category === 'Despesa')
        .reduce((total: number, t: Transaction) => total + Number(t.price), 0));

      this.saldoTotal = this.totalReceitas - this.totalDespesas;
    });
  }

  renderLineChart() {
    if (typeof Chart === 'undefined') return;
    const ctx = document.getElementById('dashboardLineChart') as HTMLCanvasElement;
    if (!ctx) return;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Receitas',
            data: this.chartReceitas,
            borderColor: 'rgba(67, 160, 71, 0.85)',
            backgroundColor: 'rgba(67, 160, 71, 0.12)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(67, 160, 71, 1)'
          },
          {
            label: 'Despesas',
            data: this.chartDespesas,
            borderColor: 'rgba(229, 57, 53, 0.85)',
            backgroundColor: 'rgba(229, 57, 53, 0.12)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(229, 57, 53, 1)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'bottom' }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#263238', font: { weight: 600 } }
          },
          x: {
            ticks: { color: '#263238', font: { weight: 600 } }
          }
        }
      }
    });
  }
}
