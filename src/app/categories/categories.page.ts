import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from './category.service';
import { AlertController, ToastController } from '@ionic/angular';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage implements OnInit, OnDestroy {
  categoriesList: any[] = [];
  private dataChangedSubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private alertController: AlertController,
    private toastController: ToastController,
    private eventService: EventService
  ) {
    this.dataChangedSubscription = this.eventService.dataChanged$.subscribe((changed) => {
      if (changed) {
        this.loadCategories();
      }
    });
  }

  ngOnDestroy() {
    if (this.dataChangedSubscription) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

  loadCategories() {
    this.categoryService.getList().subscribe({
      next: (response: any[]) => {
        this.categoriesList = response;
      },
      error: (error: any) => {
        this.toastController.create({
          message: 'Erro ao carregar lista de categorias',
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
    this.loadCategories();
  }

  // ... rest of the code ...
} 