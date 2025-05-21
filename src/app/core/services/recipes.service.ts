import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, combineLatest, Observable, of } from 'rxjs';

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
    .pipe(catchError(() => of([])));

  filterRecipeAction$ = this.filterRecipeSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateFilters(filter: Recipe) {
    this.filterRecipeSubject.next(filter);
  }
}
