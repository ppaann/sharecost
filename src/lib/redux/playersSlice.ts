import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '@/types'; // We will create this types file next

export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async () => {
    const response = await fetch('/api/players');
    return response.json();
  }
);

export const addPlayer = createAsyncThunk(
  'players/addPlayer',
  async (name: string) => {
    const response = await fetch('/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return response.json();
  }
);

export const deletePlayer = createAsyncThunk(
  'players/deletePlayer',
  async (id: string) => {
    await fetch('/api/players', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    return id;
  }
);

interface PlayersState {
  entities: Player[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: PlayersState = {
  entities: [],
  loading: 'idle',
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(
        fetchPlayers.fulfilled,
        (state, action: PayloadAction<Player[]>) => {
          state.loading = 'succeeded';
          state.entities = action.payload;
        }
      )
      .addCase(addPlayer.fulfilled, (state, action: PayloadAction<Player>) => {
        state.entities.push(action.payload);
      })
      .addCase(
        deletePlayer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.entities = state.entities.filter(
            (player) => player.id !== action.payload
          );
        }
      );
  },
});

export default playersSlice.reducer;
