import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const edited = searchParams.get('edited') === 'true';

  try {
    const clubs = await prisma.club.findMany({
      where: {
        AND: [
          edited ? { edited: true } : {},
          {
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
          },
        ],
      },
    });

    return NextResponse.json(clubs);
  } catch (error) {
    console.error('Error with fetching clubs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
