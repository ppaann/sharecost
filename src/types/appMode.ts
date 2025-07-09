export type AppMode =
  | 'syncing' // logged in, syncing data
  | 'synced' // logged in, data is synced
  | 'offline' // logged in but offline, no internet connection
  | 'local' // Local mode, no sync
  | 'onboarding' // Onboarding mode, user is setting up the app
  | 'loading'; // Loading state, fetching initial data

export type AuthMode = 'local' | 'google';
