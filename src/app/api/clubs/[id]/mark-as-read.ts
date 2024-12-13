// API endpoint for marking a notification as read
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: { method: string; query: { id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  },
) {
  if (req.method === 'POST') {
    const { id } = req.query;

    try {
      await prisma.notification.update({
        where: { id: parseInt(id, 10) },
        data: { read: true },
      });
      res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to mark as read' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
