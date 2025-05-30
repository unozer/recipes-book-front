import { Component } from '@angular/core';
import { SharedDataService } from '../core/services/shared-data.service';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  selectedRecipe = toSignal(this.sharedService.recipes$);

  constructor(private sharedService: SharedDataService){}
}
