import { createAction, props } from "@ngrx/store";
import { EventSummaryEntity } from "../reducers/events-summary.reducer";


export const loadEventSummary = createAction(
  '[app] Event summary - load event summary'
);

export const loadEventSummarySucceeded = createAction(
  '[app] event summary - load event summary succeeded',
  props<{ payload: EventSummaryEntity[] }>()
);

