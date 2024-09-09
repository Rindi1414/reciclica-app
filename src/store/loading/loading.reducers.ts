import { createReducer, on, Action } from "@ngrx/store";
import { hide, show } from "./loading.actions";
import { LoadingState } from "./LoadingState";

const initialState: LoadingState = {
  show: false,
};

const reducer = createReducer(
  initialState,
  on(show, () => {
    return { show: true };
  }),
  on(hide, () => {
    return { show: false };
  })
);

export function loadingReducer(state: LoadingState | undefined, action: Action) {
  return reducer(state, action);
}
