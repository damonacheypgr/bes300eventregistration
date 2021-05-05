import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/compiler/src/util";
import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as actions from '../actions/ws.actions';
import * as signalR from '@microsoft/signalr';
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";

@Injectable()
export class WsRegistrationsEffects {

  sendRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.registrationAdded),
      tap(a => this.hubConnection.send("addRegistration", ({
        eventId: a.registration.eventId,
        request: a.registration
      })))
    )
    , { dispatch: false }
  )
  startHub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.startHub),
      tap(() => {
        this.hubConnection = new signalR.HubConnectionBuilder()
          .withUrl(environment.hub)
          .configureLogging(signalR.LogLevel.Information)
          .build();
        this.hubConnection.start();
      })
    )

    , { dispatch: false })

  hubConnection: signalR.HubConnection;


  constructor(private actions$: Actions, private store: Store<AppState>) { }

  setUpEvents() {
    this.hubConnection.on('registrationAdded', (reg) => {
      this.store.dispatch(actions.registrationAdded({ registration: reg }))
    })
  }
}
