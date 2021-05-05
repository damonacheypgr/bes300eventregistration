import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as actions from '../actions/participatnt.actions';

@Injectable()
export class ParticipantEffects {

  readonly baseUrl = environment.eventsApi;


  register$ = createEffect(() =>
    this.actions$.pipe(

      ofType(actions.addToParticipants),
      map(a => a.payload),
      switchMap((a) => this.client.post(this.baseUrl + a.url, a.employee).pipe(
        map(() => actions.addToParticipantsSucceeded()),
        catchError((err) => {
          console.log(err);
          return of(actions.addToParticipantsFailed({ errorMessage: 'Error Adding Person' }))
        })
      ))
    )
    , { dispatch: true }
  )
  constructor(private client: HttpClient, private actions$: Actions) { }
}
