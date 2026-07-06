import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModeSelect } from '../../../features/mode-select/mode-select';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, ModeSelect],
  templateUrl: './app-nav.html',
  styleUrl: './app-nav.scss',
})
export class AppNav {}
