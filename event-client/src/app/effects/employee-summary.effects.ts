import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { environment } from '../../environments/environment';
import * as actions from '../actions/employee-summary.actions';
import { switchMap, map } from 'rxjs/operators';
import { EmployeeSummaryEntity } from "../reducers/employees-summary.reducer";

@Injectable()
export class EmployeeSummaryEffects {

  readonly baseUrl = environment.employeeApi;

  loadEmployeeSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadEmployeeSummary),
      switchMap(() => this.client.get<{ data: EmployeeSummaryEntity[] }>(this.baseUrl)
        .pipe(
          map(payload => payload.data),
          map(payload => actions.loadEmployeeSummarySucceeded({ payload }))
        )
      )
    )

  )

  constructor(private client: HttpClient, private actions$: Actions) { }
}
