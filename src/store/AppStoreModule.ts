import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./loading/loading.reducers";
import { loginReducer } from "./login/login.reducers";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "src/app/pages/login/login.effects";
import { registerReducer } from "./register/register.reducers";
import { RegisterEffects } from "./register/register.effects";

export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature("loading", loadingReducer),
  StoreModule.forFeature("login", loginReducer),
  StoreModule.forFeature("register", registerReducer),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([
    LoginEffects,
    RegisterEffects
  ])

];
