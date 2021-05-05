import { createAction, props } from "@ngrx/store";
import { EmployeeSummaryEntity } from "../reducers/employees-summary.reducer";
import { RegistrationEntity } from "../reducers/registrations.reducer";


export const startHub = createAction(
  '[app] ws start hug'
);

export const sendReservation = createAction(
  '[app] ws send reservation',
  props<{ eventId: string, employee: EmployeeSummaryEntity }>()
);

export const noEventForRegistration = createAction(
  '[app] ws no event for registration',
  props<{ message: string }>()
);

export const registrationAdded = createAction(
  '[app] ws registration added',
  props<{ registration: RegistrationEntity }>()
);

export const registrationApproved = createAction(
  '[app] ws registration approved',
  props<{ registrationId: string, status: string }>()
);

export const registrationDenied = createAction(
  '[app] ws registration denied',
  props<{ registrationId: string, status: string, message: string }>()
);
export const messageReceived = createAction(
  '[app] ws message received',
  props<{ message: string }>()
);


