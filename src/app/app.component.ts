import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: Array<{ title: string, url: string, icon: string }> = [];

  constructor() {
    // Data appPages bisa ditambahkan di sini jika diperlukan
  }
}

