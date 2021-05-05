import { createReducer, on } from "@ngrx/store"

import * as actions from '../actions/participatnt.actions';

export interface ParticipantsState {
  waiting: boolean
}

const initialState: ParticipantsState = {
  waiting: false
}


const myReducer = createReducer(
  initialState,
  on(actions.addToParticipants, (s, a) => ({ ...s, waiting: true })),
  on(actions.addToParticipantsFailed, actions.addToParticipantsSucceeded, (s, a) => ({ ...s, waiting: false }))
)

export function reducer(state, action) {
  return myReducer(state, action)
}
