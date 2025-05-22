import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  shareReplay,
} from 'rxjs';
import { Tag } from '../model/tags';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private filterRecipeSubject = new BehaviorSubject<Recipe>({
    title: '',
  });

  recipes$ = this.http
    .get<Recipe[]>(`${BASE_PATH}/recipes`)
    .pipe(
      shareReplay(1),
      catchError(() => of([]))
    );

  filterRecipeAction$ = this.filterRecipeSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateFilters(filter: Recipe) {
    this.filterRecipeSubject.next(filter);
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
