import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipe } from '../model/recipe.model';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
  BehaviorSubject,
  catchError,
  delay,
  delayWhen,
  EMPTY,
  Observable,
  retry,
  retryWhen,
  startWith,
  switchAll,
  tap,
  timer,
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

  private reconnect(observable: Observable<Recipe[]>): Observable<Recipe[]> {
    return observable.pipe(
      retry({
        delay: (error) => {
          console.log('[Data Service] Reconnecting...', error);
          return timer(500);
        }
      })
    );
  }

  private getNewWebSocket(): WebSocketSubject<Recipe[]> {
    return webSocket({
      url: WS_ENDPOINT,
      closeObserver: {
        next: () => {
          console.warn('WebSocket connection closed, reconnecting...');
          this.socket$ = undefined;
          this.connect({reconnect: true});
        },
      },
    });
  }

  sendMessage(msg: Recipe[]): void {
    this.socket$?.next(msg);
  }

  close() {
    this.socket$?.complete();
  }

  connect(cfg: {reconnect: boolean} = {reconnect: false}): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const message = this.socket$.pipe(
        cfg.reconnect ? this.reconnect : (obs) => obs,
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
