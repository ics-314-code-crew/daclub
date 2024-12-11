// src/pages/api/clubs.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const clubs = await prisma.club.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(clubs);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
