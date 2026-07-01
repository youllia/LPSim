export const environment = {
  production: false,
  defaultApiUrl: 'http://localhost:3000',
  apiUrls: {
    local: 'http://localhost:3000',
    // remote URL
    // lpic2: 'https://api.lpic-external.com/v1',
  },
} as const;

export type ApiKey = keyof typeof environment.apiUrls;