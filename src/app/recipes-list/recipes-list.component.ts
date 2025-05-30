import { ChangeDetectionStrategy, Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../core/services/recipes.service';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../core/model/recipe.model';
import { combineLatest, filter, map, Observable, scan } from 'rxjs';
import { SharedDataService } from '../core/services/shared-data.service';
import { Router } from '@angular/router';
import { RealTimeService } from '../core/services/real-time.service';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RatingModule,
    FormsModule,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent {
  recipes$ = this.service.recipes$;
  recipe = this.service.recipes;
  recipesFilter = this.service.filterRecipe;

  filterRecipes = computed(() => {
    const filterTitle = this.recipesFilter()?.title?.toLowerCase() ?? '';
    return this.recipe().filter(recipe => recipe.title?.toLowerCase().includes(filterTitle));
  });

  constructor(
    private service: RecipesService,
    private sharedService: SharedDataService,
    private realTimeService: RealTimeService,
    private router: Router
  ) {}

  editRecipe(recipe: Recipe) {
    this.sharedService.updateSelectedRecipe(recipe);
    this.router.navigate(['recipes/details']);
  }
}
