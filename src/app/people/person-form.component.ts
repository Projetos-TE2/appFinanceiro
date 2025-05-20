import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../transactions/services/person.service';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class PersonFormComponent implements OnInit {
  personForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      notes: ['']
    });
  }

  isInvalid(control: string): boolean {
    const ctrl = this.personForm.get(control);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  save() {
    if (this.personForm.invalid) return;
    this.loading = true;

    const person = this.personForm.value;
    this.personService.create(person).subscribe({
      next: () => {
        this.loading = false;
        this.eventService.notifyDataChanged();
        this.toastController.create({
          message: 'Pessoa criada com sucesso!',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
        this.router.navigate(['/people']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro ao criar pessoa:', error);
        this.toastController.create({
          message: 'Erro ao criar pessoa.',
          duration: 2000,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }
}
