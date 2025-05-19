import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, priceMask, maskitoElement, parseDateMask, formatDateMask, parseNumberMask, formatNumberMask } from 'src/app/core/constants/mask.constants';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { TransactionService } from '../services/transaction.service';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.type';
import { Transaction } from '../models/transaction.type';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  standalone: false,
})
export class TransactionFormComponent implements OnInit {

  dateMask = dateMask;
  priceMask = priceMask;
  maskitoElement = maskitoElement;

  transactionForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(150)
    ]),
    image: new FormControl('', [
      Validators.required,
      ApplicationValidators.urlValidator
    ]),
    launchDate: new FormControl(''),
    price: new FormControl(0, [Validators.required]),
    category: new FormControl('', Validators.required),
    accounts: new FormControl('', Validators.required)
  });
  transactionId!: number;
  accounts: Account[] = [];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private toastController: ToastController
  ) {
    const transactionId = this.activatedRoute.snapshot.params['transactionId'];
    if (transactionId) {
      this.transactionService.getById(transactionId).subscribe({
        next: (transaction: Transaction) => {
          if (transaction) {
            this.transactionId = transactionId;
            if (transaction.launchDate instanceof Date) {
              transaction.launchDate = formatDateMask(transaction.launchDate);
            }
            if (typeof transaction.launchDate === 'string') {
              transaction.launchDate = formatDateMask(parseDateMask(transaction.launchDate, 'yyyy/mm/dd'));
            }
            if (transaction.price && typeof transaction.price === 'number') {
              transaction.price = formatNumberMask(transaction.price);
            }
            this.transactionForm.patchValue(transaction);
          }
        },
        error: (error: any) => {
          alert('Erro ao carregar a transação com id ' + transactionId)
          console.error(error);
        }
      });
    }

    // Adiciona listener para mudanças na categoria
    this.transactionForm.get('category')?.valueChanges.subscribe((category: string) => {
      const priceControl = this.transactionForm.get('price');
      if (priceControl) {
        let currentPrice = parseNumberMask(priceControl.value);
        if (category === 'Despesa' && currentPrice > 0) {
          priceControl.setValue(formatNumberMask(-currentPrice));
        } else if (category === 'Receita' && currentPrice < 0) {
          priceControl.setValue(formatNumberMask(Math.abs(currentPrice)));
        }
      }
    });
  }

  ngOnInit() {
    this.accountService.getAccounts().subscribe({
      next: (data: Account[]) => {
        this.accounts = data;
      },
      error: (error: any) => {
        alert('Erro ao carregar contas/categorias.');
        console.error(error)
      }
    });
  }

  compareWith(o1: Account | null, o2: Account | null): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  hasError(field: string, error: string) {
    const formControl = this.transactionForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.transactionForm;
    if (value.launchDate) {
      value.launchDate = parseDateMask(value.launchDate)
    }
    if (value.price) {
      let price = parseNumberMask(value.price);
      // Garante que o valor seja negativo para despesas
      if (value.category === 'Despesa' && price > 0) {
        price = -price;
      }
      value.price = price;
    }
    this.transactionService.save({
      ...value,
      id: this.transactionId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Transação salva com sucesso!',
          duration: 3000,
        }).then((toast: any) => toast.present());
        this.router.navigate(['/transactions']);
      },
      error: (error: any) => {
        alert('Erro ao salvar a transação ' + value.title + '!');
        console.error(error);
      }
    });
  }
}
