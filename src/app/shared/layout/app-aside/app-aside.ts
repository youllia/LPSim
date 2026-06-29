import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopicSelect } from '../../../features/topic-select/topic-select';

@Component({
  selector: 'app-aside',
  imports: [RouterLink, TopicSelect],
  templateUrl: './app-aside.html',
  styleUrl: './app-aside.scss',
})
export class AppAside {}
