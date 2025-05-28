import { Component } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { Recipe } from '../core/model/recipe.model';
import * as recipeTags from '../core/model/tags';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  debounce,
  debounceTime,
  distinct,
  distinctUntilChanged,
  exhaustMap,
  finalize,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadRecipePreviewService } from '../core/services/upload-recipe-preview.service';

@Component({
  selector: 'app-recipe-creation',
  standalone: true,
  imports: [
    AutoCompleteModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    AsyncPipe,
    FileUploadModule,
  ],
  templateUrl: './recipe-creation.component.html',
  styleUrl: './recipe-creation.component.css',
})
export class RecipeCreationComponent {
  counter: number = 0;
  uploadProgress: number = 0;

  uploadedFileSubject$ = new BehaviorSubject<File[]>([]);

  onUpload(files: File[]) {
    this.counter = 0;
    this.uploadProgress = 0;
    this.uploadedFileSubject$.next(files);
  }

  uploadRecipeImages$ = this.uploadedFileSubject$.pipe(
    switchMap((uploadedFiles) =>
      forkJoin(
        uploadedFiles.map((file: File) =>
          this.uploadService
            .upload(this.recipeForm.value.id, file)
            .pipe(
              catchError((errors) => of(errors)),
              finalize(() => this.calculateProgressPercentage(++this.counter, uploadedFiles.length))
            )
        )
      )
    )
  );

  private calculateProgressPercentage(completedRequests: number, totalRequests: number) {
    this.uploadProgress = Math.round(completedRequests / totalRequests * 100);
  }

  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private uploadService: UploadRecipePreviewService
  ) {}

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

  private saveClick = new Subject<Boolean>();
  saveClick$ = this.saveClick.pipe(
    exhaustMap(() =>
      this.recipesService.saveRecipe(<Recipe>this.recipeForm.value)
    )
  );

  tags = recipeTags.TAGS;

  searchTerms = new BehaviorSubject<string>('');

  tagValues$ = this.searchTerms.pipe(
    debounceTime(2000),
    distinctUntilChanged(),
    switchMap((term: string) => this.recipesService.getTags$(term))
  );

  valueChanges$ = this.recipeForm.valueChanges.pipe(
    switchMap((formValue) => this.recipesService.saveRecipe(<Recipe>formValue)),
    catchError((errors) => of(errors))
    // tap(result => this.saveSuccess(result)
  );

  saveSuccess(_result: Recipe) {
    alert('Recipe saved successfully');
  }

  updateSearchTerm(searchTerm: string) {
    this.searchTerms.next(searchTerm);
  }

  updateRecipe() {
    this.saveClick.next(true);
  }
}
