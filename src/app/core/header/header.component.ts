import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  selectedRecipe = toSignal(this.sharedService.recipes$);
  constructor(private sharedService: SharedDataService) {}
}
