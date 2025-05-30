import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import {
  Observable,
} from 'rxjs';
import { Tag } from '../model/tags';
import { toSignal } from '@angular/core/rxjs-interop';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);

  recipes = toSignal(this.recipes$, {
    initialValue: [] as Recipe[],
    rejectErrors: true,
  });

  filterRecipe = signal({Title: ''} as Recipe)

  constructor(private http: HttpClient) {}

  updateFilters(filter: Recipe) {
    this.filterRecipe.set(filter);
  }

  saveRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${BASE_PATH}/recipes`, recipe);
  }

  getTags$: (term: string) => Observable<Tag[]> = (term: string) => {
    return this.http.get<Tag[]>(`${BASE_PATH}/tags`, {
      params: {
        criteria: term,
      },
    });
  };
}
