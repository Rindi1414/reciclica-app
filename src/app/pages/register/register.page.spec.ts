import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageModule } from './register.module';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { registerReducer } from 'src/store/register/register.reducers';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { register, registerFail, registerSuccess } from 'src/store/register/register.actions';
import { loginReducer } from 'src/store/login/login.reducers';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page: HTMLElement;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        RegisterPageModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        StoreModule.forFeature("register", registerReducer)
      ]
    })

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    fixture.debugElement.nativeElement;
  });

  it('should create register form on page init', () => {
    fixture.detectChanges();

    expect(component.registerForm).not.toBeUndefined();
  })



  it('should not be allowed to register with form invalid', () => {
    fixture.detectChanges();

    clickOnRegisterButton();

    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeFalsy();
  })

  it('given form is valid, when user clicks on register, then register', () =>{
    fixture.detectChanges();

    fillForm();

    clickOnRegisterButton();

    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeTruthy();
    })
  })

  it('given form is valid, when user clicks on register, then show load', () =>{
    fixture.detectChanges();

    fillForm();

    clickOnRegisterButton();

    store.select("loading").subscribe(state => {
      expect(state.show).toBeTruthy();
    })
  })

  it('should hide loading component when registration successful', () => {
    fixture.detectChanges();

    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerSuccess());

    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalsy();
    })
  })

  it('should login when registration successful', () => {
    fixture.detectChanges();

    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerSuccess());

    store.select('login').subscribe(state => {
      expect(state.isLoggedIn).toBeTruthy();
    })
  })

  it('should hide loading component when registration fails', () => {
    fixture.detectChanges();

    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerFail({error: {message: 'any message'}}));

    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalsy();
    })
  })

  it('should show error when registration fails', () => {
    fixture.detectChanges();

    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerFail({error: {message: 'any message'}}));

    expect(toastController.create).toHaveBeenCalled();
  })

  function clickOnRegisterButton(){
    page.querySelector('ion-button')?.click();
  }

  function fillForm() {
    component.registerForm.getForm().get('name')?.setValue('anyName');
    component.registerForm.getForm().get('email')?.setValue('any@email.com');
    component.registerForm.getForm().get('password')?.setValue('anyPassword');
    component.registerForm.getForm().get('repeatPassword')?.setValue('anyPassword');
    component.registerForm.getForm().get('phone')?.setValue('anyPhone');
    component.registerForm.getForm().get('address')?.get('street')?.setValue('any street');
    component.registerForm.getForm().get('address')?.get('number')?.setValue('any number');
    component.registerForm.getForm().get('address')?.get('complement')?.setValue('any complement');
    component.registerForm.getForm().get('address')?.get('neighborhood')?.setValue('any neighorhood');
    component.registerForm.getForm().get('address')?.get('zipcode')?.setValue('any zip code');
    component.registerForm.getForm().get('address')?.get('city')?.setValue('any city');
    component.registerForm.getForm().get('address')?.get('state')?.setValue('any state');
  }

});
});
