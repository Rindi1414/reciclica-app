import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { CanLoad, Router } from '@angular/router';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { loginSuccess } from 'src/store/login/login.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private store: Store<AppState>, private router:Router) { }

  canLoad(): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      switchMap(loginState => {
        if (loginState.isLoggedIn){
          return of(true);
        }
        this.router.navigateByUrl('login');
        return of(false);
      })
    );
  }
}
