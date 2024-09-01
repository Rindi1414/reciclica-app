import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./loading/loading.reducers";
import { loginReducer } from "./login/login.reducers";
import { LoginEffects } from "./login/login.effects";

export const AppStoreModule = [
  // Daftarkan root state dengan reducer kosong jika diperlukan
  StoreModule.forRoot({}),

  // Daftarkan feature state untuk loading dan login
  StoreModule.forFeature("loading", loadingReducer),
  StoreModule.forFeature("login", loginReducer),

  // Daftarkan LoginEffects menggunakan EffectsModule
  EffectsModule.forRoot([]),  // Digunakan jika Anda memiliki efek root
  EffectsModule.forFeature([LoginEffects])
];
