const ONBOARDING_KEY = 'onboarding';
const AUTH_MODE_KEY = 'authMode';
import { AuthMode } from '@/types';

export const isOnboardingDone = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
};
export const getAuthMode = (): AuthMode => {
  if (typeof window === 'undefined') return 'local';
  return (localStorage.getItem(AUTH_MODE_KEY) as AuthMode) ?? null;
};
export const setOnboardingChoice = (mode: AuthMode): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ONBOARDING_KEY, 'true');
  localStorage.setItem(AUTH_MODE_KEY, mode);
};
export const clearOnboardingChoice = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ONBOARDING_KEY);
  localStorage.removeItem(AUTH_MODE_KEY);
};
