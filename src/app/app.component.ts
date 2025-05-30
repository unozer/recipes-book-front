import { Component, computed, effect, signal } from '@angular/core';
import { RealTimeService } from './core/services/real-time.service';
import { Recipe } from './core/model/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  nome = signal<string>('Mario');
  cognome = signal<string>('Rossi');
  nomeCompleto = computed(() => `${this.nome()} ${this.cognome()}`);

  title = 'recipes-book-front';

  name = signal<string>('Mario Rossi');
  currencies = signal<string[]>(['EUR', 'USD', 'GBP']);
  favoriteRecipe = signal<Recipe>({
    id: 1,
    title: 'Pasta al Pomodoro',
    prepTime: 12,
  });

  constructor(private realTimeService: RealTimeService) {
    effect(() => {
      console.log('Valore modificato di nome:', this.nome());
    });

    console.log('name', this.nome());

    // this.name.set('Giovanni Bianchi');
    // this.name.update((current) => current + ' Verdi');

    // non si può fare sui sola lettura
    // this.nomeCompleto.set('Pippo Franco');
    // this.nomeCompleto.update(current => current + 'Pippo Franco');

    console.log('realTimeService');
    realTimeService.connect();
  }

  changeName() {
    this.nome.update(value => value + ' modificato');
  }
}
