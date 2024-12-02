// pages/api/search.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust the import path as needed

// eslint-disable-next-line consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const results = await prisma.club.findMany({
    where: {
      name: {
        contains: query as string,
        mode: 'insensitive',
      },
    },
  });

  res.status(200).json(results);
};
