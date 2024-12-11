import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const editedOnly = searchParams.get('editedOnly') === 'true';

  try {
    const clubs = await prisma.club.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            interestAreas: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
        ...(editedOnly && {
          edited: true,
        }),
      },
    });

    return NextResponse.json(clubs);
  } catch (error) {
    console.error('Error with fetching clubs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
