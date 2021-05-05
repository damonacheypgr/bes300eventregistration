import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { environment } from '../../environments/environment';
import * as actions from '../actions/event-summary.actions';
import { switchMap, map } from 'rxjs/operators';
import { EventSummaryEntity } from "../reducers/events-summary.reducer";

@Injectable()
export class EventSummaryEffects {

  readonly baseUrl = environment.eventsApi;

  loadEventSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadEventSummary),
      switchMap(() => this.client.get<{ data: EventSummaryEntity[] }>(this.baseUrl)
        .pipe(
          map(payload => payload.data),
          map(payload => actions.loadEventSummarySucceeded({ payload }))
        )
      )
    )

  )

  constructor(private client: HttpClient, private actions$: Actions) { }
}
