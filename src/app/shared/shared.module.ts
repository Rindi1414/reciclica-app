// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';

@NgModule({
  declarations: [PickupCallCardComponent], // Deklarasikan komponen
  exports: [PickupCallCardComponent], // Ekspor komponen agar bisa digunakan di modul lain
  imports: [CommonModule, IonicModule], // Import modul yang dibutuhkan oleh komponen
})
export class SharedModule {}
