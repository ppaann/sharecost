import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HistoryEntry, GameData, SettlementData, Player } from '@/types';

export const fetchHistory = createAsyncThunk(
  'history/fetchHistory',
  async () => {
    const response = await fetch('/api/history');
    return response.json();
  }
);

export const addGame = createAsyncThunk(
  'history/addGame',
  async (gameData: GameData) => {
    const response = await fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData),
    });
    return response.json();
  }
);

export const settleBalance = createAsyncThunk(
  'history/settleBalance',
  async (settlementData: SettlementData, { getState }) => {
    const { entities } = (getState() as { players: { entities: Player[] } })
      .players;
    const me = entities.find((p) => p.isMe);
    if (!me) {
      throw new Error('Current user not found in players list');
    }
    const response = await fetch('/api/settle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...settlementData, settledById: me.id }),
    });
    return response.json();
  }
);

interface HistoryState {
  entries: HistoryEntry[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: HistoryState = {
  entries: [],
  loading: 'idle',
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(
        fetchHistory.fulfilled,
        (state, action: PayloadAction<HistoryEntry[]>) => {
          state.loading = 'succeeded';
          state.entries = action.payload;
        }
      )
      .addCase(
        addGame.fulfilled,
        (state, action: PayloadAction<HistoryEntry>) => {
          state.entries.unshift(action.payload);
        }
      )
      .addCase(
        settleBalance.fulfilled,
        (state, action: PayloadAction<HistoryEntry>) => {
          state.entries.unshift(action.payload);
        }
      );
  },
});

export default historySlice.reducer;
