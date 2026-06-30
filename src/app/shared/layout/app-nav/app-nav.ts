import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModeSelect } from '../../../features/mode-select/mode-select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabNavPanel } from '@angular/material/tabs';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, ModeSelect],
  templateUrl: './app-nav.html',
  styleUrl: './app-nav.scss',
})
export class AppNav { }
