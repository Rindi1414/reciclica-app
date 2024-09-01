import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { Observable, of, throwError } from "rxjs";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginEffects } from "./login.effects";
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from "src/app/modul/user/User";
 // Pastikan Anda mengimpor AuthService dengan benar

describe('Login effects', () => {

  let effects: LoginEffects;
  let actions$: Observable<any>;
  let error = {error: 'error'};
  let user = new User();
  user.id = "anyUserId";

  let authServiceMock = {
    recoverEmailPassword: (email: string) => {
      if(email === "error@email.com"){
        return throwError(error);
      }
      return of({});
    },
    login: (email: string, password: string) => {
      if (email == "error@email.com"){
        return throwError(error);
      }
      return of(user);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        // Mendaftarkan efek LoginEffects ke dalam module
      ],
      providers: [
        LoginEffects,
        provideMockActions(() => actions$),
      ]
    });

    // Override AuthService dengan mock
    TestBed.overrideProvider(AuthService, { useValue: authServiceMock });

    effects = TestBed.inject(LoginEffects);
  });

  it('should recover password with existing email return success', (done) => {
    actions$ = of(recoverPassword({email: "any@email.com"}));

    effects.recoverPassword$.subscribe(newAction => {
      expect(newAction).toEqual(recoverPasswordSuccess());
      done();
    });
  })

  it('should recover password with not existing email return an error', (done) => {
    actions$ = of(recoverPassword({email: "error@email.com"}));

    effects.recoverPassword$.subscribe(newAction => {
      expect(newAction).toEqual(recoverPasswordFail({error}));
      done();
    })
  })

  it('should login with valid credentials return success', done => {
    actions$ = of(login({email: "valid@email.com", password: "anyPassword"}));

    effects.login$.subscribe(newAction => {
      expect(newAction).toEqual(loginSuccess({user}));
      done();
    })
  })

  it('should login with invalid credentials return error', done => {
    actions$ = of(login({email: "error@email.com", password: "anyPassword"}));

    effects.login$.subscribe(newAction => {
      expect(newAction).toEqual(loginFail({error}));
      done();
    })
  })


  });
