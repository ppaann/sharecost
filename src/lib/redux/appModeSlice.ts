import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthMode } from '@/types';
import {
  isOnboardingDone,
  getAuthMode,
  setOnboardingChoice,
} from '../appMode/appMode';
import { AppMode } from '@/types';

export interface AppModeState {
  mode: AppMode;
}

const initialState: AppModeState = {
  mode: isOnboardingDone()
    ? getAuthMode() == 'local'
      ? 'local'
      : 'offline'
    : 'onboarding',
};

const appModeSlice = createSlice({
  name: 'appMode',
  initialState,
  reducers: {
    onSelectOnboardingChoice: (state, action: PayloadAction<AuthMode>) => {
      const mode = action.payload;
      setOnboardingChoice(mode);
      if (mode === 'local') {
        state.mode = 'local';
      } else if (mode === 'google') {
        state.mode = 'offline';
      }
    },
    updateAppMode: (state, action: PayloadAction<AppMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { onSelectOnboardingChoice, updateAppMode } = appModeSlice.actions;

export default appModeSlice.reducer;
