import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { SharedDataService } from '../shared-data.service';
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
  recipes$ = combineLatest([
    this.service.recipes$,
    this.realTimeService.messages$,
  ]).pipe(
    scan((acc: Recipe[], [recipes, realTimeRecipes]: [Recipe[], Recipe[]]) => {
      return acc.length === 0 && realTimeRecipes.length === 0 ? recipes : [...acc, ...realTimeRecipes];
    }, [])
  );

  filterRecipeAction$ = this.service.filterRecipeAction$;

  filteredRecipes$ = combineLatest([
    this.recipes$,
    this.filterRecipeAction$,
  ]).pipe(
    map(([recipes, filter]: [Recipe[], Recipe]) => {
      const filterTitle = filter?.title?.toLowerCase() ?? '';
      return recipes.filter((recipe) =>
        recipe.title?.toLowerCase().includes(filterTitle)
      );
    })
  );

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
