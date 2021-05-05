import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as actions from '../actions/registrations.actions';

@Injectable()
export class RegistrationEffects {
  readonly baseUrl = environment.eventsApi;

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.sendRegistration),
      switchMap(original => this.client.post<{ id: string, status: string }>(
        this.baseUrl + original.payload.eventId + '/registrations', original.employee)
        .pipe(
          map(response => actions.sendRegistrationSucceeded({
            oldId: original.payload.id, payload: {
              id: response.id,
              status: response.status,
              employeeName: '',
              eventName: '',
              eventId: ''
            }
          }))
        )
      )
    )
  )

  checkStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkRegistrationStatus),
      switchMap(action => this.client.get<{ status: string }>(this.baseUrl + action.eventId + '/registrations/' + action.registrationId)
        .pipe(
          map(s => actions.checkRegistrationStatusSucceeded({ registionId: action.registrationId, status: s.status }))
        )
      )
    )

  )

  constructor(private client: HttpClient, private actions$: Actions) { }
}
