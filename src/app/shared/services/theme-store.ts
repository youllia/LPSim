import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'lpsim-theme';

/**
 * Holds the active colour theme. Initialises from the user's stored choice, or
 * from the OS preference on first visit, and reflects the value onto
 * <html data-theme="…"> so the CSS token layer switches. The choice is a device
 * UI preference (not learner data) and is persisted to localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeStore {
  readonly theme = signal<Theme>(this.#initial());

  constructor() {
    effect(() => {
      const theme = this.theme();
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Storage may be unavailable (private mode); the in-session value still works.
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  #initial(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // ignore
    }
    const prefersDark =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
