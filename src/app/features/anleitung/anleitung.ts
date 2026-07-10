import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-anleitung',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './anleitung.html',
  styleUrl: './anleitung.scss',
})
export class Anleitung {}
