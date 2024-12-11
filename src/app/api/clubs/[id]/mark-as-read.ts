import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      await prisma.club.update({
        where: { id: Number(id) },
        data: { read: true },
      });
      res.status(200).json({ message: 'Club marked as read' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark club as read' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
