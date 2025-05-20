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
  private chart: any;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.atualizarSaldos();
  }

  ngAfterViewInit() {
    this.renderBarChart();
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

  renderBarChart() {
    if (typeof Chart === 'undefined') return;
    const ctx = document.getElementById('dashboardBarChart') as HTMLCanvasElement;
    if (!ctx) return;
    this.transactionService.getList().subscribe((transactions: Transaction[]) => {
      const receitasPorMes: number[] = Array(12).fill(0);
      const despesasPorMes: number[] = Array(12).fill(0);
      transactions.forEach((t: Transaction) => {
        const data = new Date(t.launchDate);
        const mes = data.getMonth();
        if (t.category === 'Receita') {
          receitasPorMes[mes] += Number(t.price);
        } else if (t.category === 'Despesa') {
          despesasPorMes[mes] += Math.abs(Number(t.price));
        }
      });
      if (this.chart) this.chart.destroy();
      const ctx2d = ctx.getContext('2d');
      if (!ctx2d) return;
      // Gradiente para saldo (azul padrão)
      const saldoGradient = ctx2d.createLinearGradient(0, 0, 0, ctx.height);
      saldoGradient.addColorStop(0, 'rgba(33, 150, 243, 0.4)');
      saldoGradient.addColorStop(1, 'rgba(33, 150, 243, 0.05)');
      // Calcular saldo acumulado mês a mês
      const saldoPorMes: number[] = [];
      let saldoAcumulado = 0;
      for (let i = 0; i < 12; i++) {
        saldoAcumulado += receitasPorMes[i] - despesasPorMes[i];
        saldoPorMes.push(saldoAcumulado);
      }
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [
            {
              label: '',
              data: saldoPorMes,
              fill: true,
              backgroundColor: saldoGradient,
              borderColor: 'rgba(33, 150, 243, 1)',
              pointBackgroundColor: 'rgba(33, 150, 243, 1)',
              pointBorderColor: '#fff',
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 0,
              clip: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: 2,
          layout: { padding: 0 },
          animation: {
            duration: 750,
            easing: 'easeInOutQuart'
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(33, 150, 243, 0.95)',
              titleColor: '#fff',
              bodyColor: '#fff',
              titleFont: {
                family: "Arial, Helvetica, sans-serif",
                size: 14,
                weight: '600'
              },
              bodyFont: {
                family: "Arial, Helvetica, sans-serif",
                size: 13,
                weight: '500'
              },
              padding: 12,
              cornerRadius: 8,
              displayColors: true,
              usePointStyle: true
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#2f374a',
                drawBorder: false
              },
              border: {
                display: false
              },
              ticks: { 
                color: '#2f374a', 
                font: { 
                  family: "Arial, Helvetica, sans-serif",
                  size: 12,
                  weight: '550' 
                },
                padding: 8,
                callback: function(value: number) {
                  return value.toLocaleString('pt-BR');
                },
                maxTicksLimit: 8
              },
              maxTicksLimit: 8
            },
            x: {
              grid: {
                display: false,
                drawBorder: false,
                color: 'transparent',
              },
              ticks: {
                display: false
              },
              offset: false
            }
          }
        }
      });
    });
  }
}
