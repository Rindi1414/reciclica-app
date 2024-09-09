import { Action, createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../login/AppInitialState";
import { RegisterState } from "./RegisterState";
import { register, registerFail, registerSuccess } from "./register.actions";
import { state } from "@angular/animations";

const initialState = AppInitialState.register;
const reducer = createReducer(initialState,
  on(register, state => {
    return {
      ...state,
      error: null,
      isRegistered: false,
      isRegistering: true
    }

  }),
  on(registerSuccess, state =>{
    return {
      ...state,
      isRegistered: true,
      isRegistering: false
    }
  } ),
  on(registerFail, (state, action) =>{
    return {
      ...state,
      error: action.error,
      isRegistered: false,
      isRegistering: false
    }
  } )
);

export function registerReducer(state: RegisterState, action: Action) {
  return reducer(state, action);
}
