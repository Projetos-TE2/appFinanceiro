import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../transactions/services/account.service';
import { Account } from '../transactions/models/account.type';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class AccountFormComponent implements OnInit {
  accountForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      institution: ['', Validators.required],
      type: ['', Validators.required],
      balance: [0, Validators.required],
      manufacture: ['']
    });
  }

  isInvalid(control: string): boolean {
    const ctrl = this.accountForm.get(control);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  save() {
    if (this.accountForm.invalid) return;
    this.loading = true;
    const account: Account = this.accountForm.value;
    this.accountService.create(account).subscribe({
      next: () => {
        this.loading = false;
        this.eventService.notifyDataChanged();
        this.toastController.create({
          message: 'Conta criada com sucesso!',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
        this.router.navigate(['/accounts']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro ao criar conta:', error);
        this.toastController.create({
          message: 'Erro ao criar conta.',
          duration: 2000,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }
}
