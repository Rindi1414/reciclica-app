import { effect, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "src/store/login/login.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";

@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions, private authServices: AuthService) {

  }

  recoverPassword$ = createEffect(() => this.actions$.pipe(
    ofType(recoverPassword),
    switchMap((payload: {email: string}) => this.authServices.recoverEmailPassword(payload.email).pipe(
      map(() => recoverPasswordSuccess()),
      catchError(error => of(recoverPasswordFail({error})))
    ))
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap((payload: {email: string, password: string}) =>
      this.authServices.login(payload.email, payload.password).pipe(
        map(user => loginSuccess({user})),
        catchError(error => of(loginFail({error})))
      )
    )
  ))
}
