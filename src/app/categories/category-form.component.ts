import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private categoryService: CategoryService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['']
    });
  }

  isInvalid(control: string): boolean {
    const ctrl = this.categoryForm.get(control);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  save() {
    if (this.categoryForm.invalid) return;
    this.loading = true;

    const category = this.categoryForm.value;
    this.categoryService.create(category).subscribe({
      next: () => {
        this.loading = false;
        this.eventService.notifyDataChanged();
        this.toastController.create({
          message: 'Categoria criada com sucesso!',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
        this.router.navigate(['/categories']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro ao criar categoria:', error);
        this.toastController.create({
          message: 'Erro ao criar categoria.',
          duration: 2000,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }
}
