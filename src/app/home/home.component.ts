import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  TITLE = 'DemoComponent';

  constructor(private app: AppComponent) {
    const SCOPE = 'constructor';
    console.log(`[${this.TITLE}@${SCOPE}]`);
  }
}
