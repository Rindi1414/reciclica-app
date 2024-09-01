import { createAction, props } from "@ngrx/store";
import { User } from "src/app/modul/user/User";

// Action untuk recover password
export const recoverPassword = createAction("[Recover password]", props<{email: string}>());
export const recoverPasswordSuccess = createAction("[Recover password] success");
export const recoverPasswordFail = createAction("[Recover password] fail", props<{ error: any }>());

// Action untuk login
export const login = createAction("[Login]", props<{email: string, password: string}>());
export const loginSuccess = createAction("[Login] success", props<{ user: User }>());
export const loginFail = createAction("[Login] fail", props<{ error: any }>());
