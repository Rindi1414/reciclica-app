import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ],
  declarations: [
    RegisterPage,
    // ErrorMessageComponent
]
})
export class RegisterPageModule {}
