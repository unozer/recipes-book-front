import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  selectedRecipe$ = this.sharedService.selectedRecipe$;
  constructor(private sharedService: SharedDataService) {}
}
