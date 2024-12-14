import { notifyExpiringClubs } from '@/lib/dbActions';

export default async function handler(
  req: { method: string },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message?: string; error?: string }): void; new (): any };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  },
) {
  if (req.method === 'POST') {
    try {
      await notifyExpiringClubs(7); // Notify 7 days before expiration
      res.status(200).json({ message: 'Notifications created successfully' });
    } catch (error) {
      console.error('Error creating notifications:', error);
      res.status(500).json({ error: 'Failed to create notifications' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
