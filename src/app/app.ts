import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppNav } from './shared/layout/app-nav/app-nav';
import { AppFooter } from './shared/layout/app-footer/app-footer';
import { AppAside } from './shared/layout/app-aside/app-aside';
import { AppHeader } from './shared/layout/app-header/app-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppNav, AppFooter, AppAside, AppHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('LPSim');
}
