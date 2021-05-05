import { createAction, props } from "@ngrx/store";
import { EmployeeSummaryEntity } from "../reducers/employees-summary.reducer";
import { EventSummaryEntity } from "../reducers/events-summary.reducer";



export const addToParticipants = createAction(
  '[app] add to participants',
  ({ event, employee }: { event: EventSummaryEntity, employee: EmployeeSummaryEntity }) => ({
    payload: {
      url: `${event.id}/participants`,
      employee
    }
  })
);
export const addToParticipantsSucceeded = createAction(
  '[app] add to participants succeeded'
);

export const addToParticipantsFailed = createAction(
  '[app] add to participants failed',
  props<{ errorMessage: string }>()
);
