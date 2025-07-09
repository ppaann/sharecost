// hooks/useAppMode.ts
import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabaseClient';
import { AppMode } from '@/types';
import {
  isOnboardingDone,
  getAuthMode,
  setOnboardingChoice,
} from '@/lib/appMode/appMode';

export function useAppMode(): [AppMode, (mode: AppMode) => void] {
  const [mode, setMode] = useState<AppMode>('loading');

  useEffect(() => {
    const init = async () => {
      if (!isOnboardingDone()) {
        setMode('onboarding');
        return;
      }

      const authMode = getAuthMode();
      if (authMode === 'google') {
        // const { data } = await supabase.auth.getUser();
        const data = { user: 'zz' }; // Mocking supabase response for example
        if (data.user) {
          setMode('synced');
        } else {
          setMode('offline');
        }
      } else {
        setMode('local');
      }
    };

    init();
  }, []);

  const updateMode = (newMode: AppMode) => {
    setMode((prev) => {
      if (prev === 'onboarding' && newMode == 'local') {
        setOnboardingChoice(newMode); // Default to local for onboarding
      }
      return newMode;
    });
  };
  return [mode, updateMode];
}
