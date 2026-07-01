import { InjectionToken } from "@angular/core";
import { environment } from "../../../environments/environments";

export const API_URLS = new InjectionToken<typeof environment.apiUrls>(
  'API_URLS',
  { providedIn: 'root', factory: () => environment.apiUrls }
);