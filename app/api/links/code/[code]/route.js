import clientPromise from '@/lib/mongodb';

const DATABASE_NAME = 'projects';
const COLLECTION_NAME = 'tinylink';

export async function GET(_request, { params }) {
  try {
    const { code } = params;

    if (!code) {
      return Response.json(
        {
          status: 'error',
          message: 'Code is required',
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const link = await collection.findOne({ customCode: code });

    if (!link) {
      return Response.json(
        {
          status: 'error',
          message: 'Link not found',
        },
        { status: 404 },
      );
    }

    const serialized = {
      id: link._id.toString(),
      ...link,
      _id: undefined,
    };

    return Response.json({
      status: 'success',
      data: serialized,
    });
  } catch (error) {
    console.error('GET /api/links/code/[code] error:', error);
    return Response.json(
      {
        status: 'error',
        message: 'Unable to fetch link',
        error: error.message,
      },
      { status: 500 },
    );
  }
}

