import { createAction, props } from "@ngrx/store";
import { EmployeeSummaryEntity } from "../reducers/employees-summary.reducer";
import { EventSummaryEntity } from "../reducers/events-summary.reducer";
import { RegistrationEntity } from "../reducers/registrations.reducer";

let id = 1;
export const sendRegistration = createAction(
  '[app] send registration',
  ({ employee, event }: { employee: EmployeeSummaryEntity, event: EventSummaryEntity }) => ({
    payload: {
      id: 'TEMP' + id++,
      employeeName: employee.firstName + ' ' + employee.lastName,
      eventName: event.name,
      eventId: event.id,
      status: 'SENDING'
    } as RegistrationEntity,
    employee
  })
);

export const sendRegistrationSucceeded = createAction(
  '[app] send registration succeeded',
  props<{ oldId: string, payload: RegistrationEntity }>()
);

export const checkRegistrationStatus = createAction(
  '[app] check registration status',
  props<{ registrationId: string, eventId: string }>()
);

export const checkRegistrationStatusSucceeded = createAction(
  '[app] check registration status succeeded',
  props<{ registionId: string, status: string }>()
);
