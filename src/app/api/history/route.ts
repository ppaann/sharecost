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

export async function GET() {
  await db.read();
  db.data ||= { players: [], history: [] };
  const sortedHistory = [...db.data.history].sort(
    (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
  );
  return new Response(JSON.stringify(sortedHistory), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
export async function POST(req: Request) {
  await db.read();
  db.data ||= { players: [], history: [] };
  const newEntry = {
    ...(await req.json()),
    id: uuidv4(),
    date: new Date().toISOString(),
  };
  db.data.history.push(newEntry);
  await db.write();
  return Response.json(newEntry, { status: 201 });
}
