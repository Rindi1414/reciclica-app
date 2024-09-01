import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { StoreModule, Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { LoginState } from 'src/store/login/LoginState'; // Pastikan path ini benar
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/modul/user/User';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: HTMLElement;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}), // Berikan state root yang sesuai
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router); // Gunakan TestBed.inject
    store = TestBed.inject(Store); // Gunakan TestBed.inject
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create form on init', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  });

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledOnceWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {
    fixture.detectChanges()
    component.form.get('email')?.setValue("valid@email.com");
    (page.querySelector("#recoverPasswordButton") as HTMLElement)?.click();

    store.select(state => state.login).subscribe((loginState: LoginState) => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  })

  it('given user is recovering password, when success, then hide loading and show success message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@email.com"}));
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('given user is recovering password, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@email.com"}));
    store.dispatch(recoverPasswordFail({error: "message"}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should show loading and start login when logging in', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    (page.querySelector('#loginButton') as HTMLElement)?.click();

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    })
  })

  it('given user is logging in, when success, then hide loading and send user to home page', () => {
    spyOn(router, 'navigate');

    fixture.detectChanges();
    store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
    store.dispatch(loginSuccess({user: new User()}));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    });
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('given user is logging in, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
    store.dispatch(loginFail({error: {messaage: 'error message'}}));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })
});
