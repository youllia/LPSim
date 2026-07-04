import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNav } from './shared/layout/app-nav/app-nav';
import { AppHeader } from './shared/layout/app-header/app-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppNav, AppHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('LPSim');
}
