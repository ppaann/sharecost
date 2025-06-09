import type { NextApiRequest, NextApiResponse } from 'next';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';

type HistoryEntry = {
  id: string;
  date?: string; // ISO date string
};

type Player = {
  id: string;
  name: string;
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
  await db.read();
  db.data ||= { players: [], history: [] };

  switch (req.method) {
    case 'GET':
      const sortedHistory = [...db.data.history].sort(
        (a, b) =>
          new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
      );
      res.status(200).json(sortedHistory);
      break;

    case 'POST':
      const newEntry = {
        ...req.body,
        id: uuidv4(),
        date: new Date().toISOString(),
      };
      db.data.history.push(newEntry);
      await db.write();
      res.status(201).json(newEntry);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
