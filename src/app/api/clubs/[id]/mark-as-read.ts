import { NextApiRequest, NextApiResponse } from 'next';
import { deleteNotification } from '@/lib/dbActions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      await deleteNotification(Number(id));
      res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark notification as read' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
