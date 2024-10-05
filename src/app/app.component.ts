import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';

import * as QRCode from 'qrcode';

import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ENV = environment;
  TITLE = 'AppComponent';

  isLoading: boolean = false;

  constructor() {
    const scope = 'constructor';
    console.log(`[${this.TITLE}@${scope}]`);
  }

  alert(message: string = '') {
    const scope = 'alert';
    console.log(`[${this.TITLE}@${scope}] message`, message);

    alert(message);
  }
}
