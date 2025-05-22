import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  share,
  shareReplay,
  switchMap,
  timer,
} from 'rxjs';
import { Tag } from '../model/tags';

const BASE_PATH = environment.basePath;
const REFRESH_INTERVAL = 1000 * 10;
const timer$ = timer(0, REFRESH_INTERVAL);

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private filterRecipeSubject = new BehaviorSubject<Recipe>({
    title: '',
  });

  recipes$ = timer$.pipe(
    switchMap((_) => this.http.get<Recipe[]>(`${BASE_PATH}/recipes`)),
    shareReplay({ bufferSize: 1, refCount: false })
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
