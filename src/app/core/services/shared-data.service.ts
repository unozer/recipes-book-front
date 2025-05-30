import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  selectedRecipe = signal({} as Recipe)
  selectedRecipeId = signal<number | undefined>(undefined);

  recipes$ = toObservable(this.selectedRecipeId).pipe(
    filter(Boolean), switchMap(id => 
      this.http.get<Recipe>(`${BASE_PATH}/recipes/${id}`)
    )
  );

  constructor(private http: HttpClient) { }

  updateSelectedRecipe(recipeId: number) {
    this.selectedRecipeId.set(recipeId);
  }
}
