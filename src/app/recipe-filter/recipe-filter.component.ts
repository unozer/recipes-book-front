import { Component } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../core/model/recipe.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.css',
})
export class RecipeFilterComponent {
  recipeForm = this.fb.group<Recipe>({
    title: '',
    category: '',
    ingredients: '',
    tags: '',
    prepTime: undefined,
    cookingTime: undefined,
  });

  constructor(
    private recipesService: RecipesService,
    private fb: FormBuilder
  ) {}

  filterResults() {
    this.recipesService.updateFilters(<Recipe>this.recipeForm.value);
  }

  clearFilters() {
    this.recipeForm.reset();
  }
}
