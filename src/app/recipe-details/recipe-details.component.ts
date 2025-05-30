import { Component } from '@angular/core';
import { SharedDataService } from '../core/services/shared-data.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  selectedRecipe$ = this.sharedService.selectedRecipe$;

  constructor(private sharedService: SharedDataService){}
}
