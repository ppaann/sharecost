import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import type { Data } from '@/types';

const adapter = new JSONFile<Data>('db/db.json');
const db = new Low<Data>(adapter, { players: [], history: [] });

export async function GET() {
  await db.read();
  db.data ||= { players: [], history: [] };
  return new Response(JSON.stringify(db.data.players), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request) {
  await db.read();
  db.data ||= { players: [], history: [] };
  const { name } = await req.json();
  if (!name) {
    return new Response(
      JSON.stringify({ message: 'Player name is required' }),
      { status: 400 }
    );
  }
  if (db.data.players.some((p) => p.name === name)) {
    return new Response(
      JSON.stringify({ message: 'Player with this name already exists' }),
      { status: 409 }
    );
  }

  const newPlayer = { id: uuidv4(), name };
  db.data.players.push(newPlayer);
  await db.write();
  return new Response(JSON.stringify(newPlayer), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req: Request) {
  await db.read();
  db.data ||= { players: [], history: [] };
  const { id } = await req.json();
  if (!id) {
    return new Response(JSON.stringify({ message: 'Player ID is required' }), {
      status: 400,
    });
  }

  const initialPlayerCount = db.data.players.length;
  db.data.players = db.data.players.filter((p) => p.id !== id);

  if (db.data.players.length === initialPlayerCount) {
    return new Response(JSON.stringify({ message: 'Player not found' }), {
      status: 404,
    });
  }

  db.data.history = db.data.history.filter((entry) => {
    if (entry.type === 'game' && entry.paidBy?.id === id) {
      return false;
    }
    if (entry.participants) {
      entry.participants = entry.participants.filter((pId) => pId !== id);
    }
    return true;
  });

  await db.write();
  return Response.json({ message: 'Player deleted successfully' });
}
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await db.read();
//   db.data ||= { players: [], history: [] };

//   switch (req.method) {
//     case 'GET':
//       res.status(200).json(db.data.players);
//       break;

//     case 'POST':
//       const { name } = req.body;
//       if (!name) {
//         return res.status(400).json({ message: 'Player name is required' });
//       }
//       const newPlayer = { id: uuidv4(), name };
//       db.data.players.push(newPlayer);
//       await db.write();
//       res.status(201).json(newPlayer);
//       break;

//     case 'DELETE':
//       const { id } = req.body;
//       if (!id) {
//         return res.status(400).json({ message: 'Player ID is required' });
//       }

//       // Remove player
//       const initialPlayerCount = db.data.players.length;
//       db.data.players = db.data.players.filter((p) => p.id !== id);

//       if (db.data.players.length === initialPlayerCount) {
//         return res.status(404).json({ message: 'Player not found' });
//       }

//       // Remove player from history participants and handle games they paid for
//       db.data.history = db.data.history.filter((entry) => {
//         if (entry.type === 'game' && entry.paidBy?.id === id) {
//           return false; // Remove game if the deleted player paid
//         }
//         if (entry.participants) {
//           entry.participants = entry.participants.filter((pId) => pId !== id);
//         }
//         return true;
//       });

//       await db.write();
//       res.status(200).json({ message: 'Player deleted successfully' });
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
