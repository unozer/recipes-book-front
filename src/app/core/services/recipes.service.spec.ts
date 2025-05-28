import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RecipesService } from './recipes.service';
import { Recipe } from '../model/recipe.model';

describe('RecipesService', () => {
  let service: RecipesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipesService],
    });
    service = TestBed.inject(RecipesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a recipe', () => {
    const recipeToSave: Recipe = {
      id: 12,
      title: 'Test Recipe',
      prepTime: 10,
      cookingTime: 20,
      yield: 4,
      imageUrl: 'http://example.com/image.jpg',
    };

    service.saveRecipe(recipeToSave).subscribe(recipe => {
      expect(recipe).toEqual(recipeToSave)
    })

    const req = httpTestingController.expectOne('/api/recipes');
    expect(req.request.method).toEqual('POST');
    req.flush(recipeToSave);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
