import { Component } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { Recipe } from '../core/model/recipe.model';
import * as recipeTags from '../core/model/tags';
import { catchError, concatMap, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
selector: 'app-recipe-creation',
  standalone: true,
  imports: [RadioButtonModule, FormsModule, ReactiveFormsModule, ButtonModule, AsyncPipe],
  templateUrl: './recipe-creation.component.html',
  styleUrl: './recipe-creation.component.css'
})
export class RecipeCreationComponent {
  constructor(private fb: FormBuilder, private recipesService: RecipesService) {}

  recipeForm = this.fb.group<Recipe>({
    id: Math.floor(1000 + Math.random() * 9000),
    title: '',
    category: '',
    ingredients: '',
    tags: '',
    prepTime: undefined,
    cookingTime: undefined,
    imageUrl: '',
    yield: 0,
    steps: '',
  });

  tags = recipeTags.TAGS;

  valueChanges$ = this.recipeForm.valueChanges.pipe(
    concatMap(formValue => 
      this.recipesService.saveRecipe(<Recipe>formValue)),
      catchError(errors => of(errors))
     // tap(result => this.saveSuccess(result)
    
  );

  saveSuccess(_result: Recipe) {
    alert('Recipe saved successfully');
  }
}
