import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipe } from '../model/recipe.model';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  Observable,
  startWith,
  switchAll,
  tap,
} from 'rxjs';

const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root',
})
export class RealTimeService {
  private socket$: WebSocketSubject<Recipe[]> | undefined;

  private messageSubject$ = new BehaviorSubject<Observable<Recipe[]>>(EMPTY);

  public messages$ = this.messageSubject$.pipe(
    switchAll(),
    startWith([]),
    catchError((e) => {
      throw e;
    })
  );

  private getNewWebSocket(): WebSocketSubject<Recipe[]> {
    return webSocket(WS_ENDPOINT);
  }

  sendMessage(msg: Recipe[]): void {
    this.socket$?.next(msg);
  }

  close() {
    this.socket$?.complete();
  }

  connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const message = this.socket$.pipe(
        tap({
          error: (error) => console.error('WebSocket error:', error),
        }),
        catchError((_) => EMPTY)
      );
      this.messageSubject$.next(message);
    }
  }

  constructor() {}
}
