import { Service, signal } from '@angular/core';
import { Mode } from '../models/mode';

@Service()
export class ModeState {
    readonly mode = signal<Mode>('lernen');
}
