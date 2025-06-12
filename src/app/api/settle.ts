import type { NextApiRequest, NextApiResponse } from 'next';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';

// Define types matching your data structure
type Player = {
  id: string;
  name: string;
};

type HistoryEntry = {
  id: string;
  type: 'game' | 'settlement';
  date: string;
  [key: string]: unknown;
};

type Data = {
  players: Player[];
  history: HistoryEntry[];
};

const adapter = new JSONFile<Data>('db/db.json');
const db = new Low<Data>(adapter, { players: [], history: [] });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await db.read();
  db.data ||= { players: [], history: [] };

  const { playerId, playerName, amount } = req.body;

  if (!playerId || !playerName || amount === undefined) {
    return res
      .status(400)
      .json({ message: 'Missing required fields for settlement.' });
  }

  try {
    const newSettlement: HistoryEntry = {
      id: uuidv4(),
      type: 'settlement',
      playerId,
      playerName,
      amount,
      date: new Date().toISOString(),
    };

    db.data.history.push(newSettlement);
    await db.write();

    res.status(201).json(newSettlement);
  } catch (error) {
    console.error('Failed to record settlement:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
