import clientPromise from '@/lib/mongodb';
import { nanoid } from "nanoid";

const DATABASE_NAME = 'projects';
const COLLECTION_NAME = 'tinylink';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const links = await collection.find({}).sort({ createdAt: -1 }).toArray();

    const serialized = links.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return Response.json({ status: 'success', data: serialized });
  } catch (error) {
    console.error('GET /api/links error:', error);
    return Response.json(
      {
        status: 'error',
        message: 'Unable to fetch links',
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const CODE_RE = /^[A-Za-z0-9]{6,8}$/;
    const body = await request.json();
    const { title, url, description = '', customCode } = body || {};

    if (!title || !url) {
      return Response.json(
        {
          status: 'error',
          message: 'Both title and url are required',
        },
        { status: 400 },
      );
    }

    let normalizedUrl;
    try {
      const parsedUrl = new URL(url);
      normalizedUrl = parsedUrl.toString();
    } catch {
      return Response.json(
        {
          status: 'error',
          message: 'Invalid URL format',
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    let shortCode;

    if (customCode) {
      if (!CODE_RE.test(customCode)) {
        return Response.json(
          {
            status: 'error',
            message: 'Invalid custom code format; use 6-8 alphanumeric characters.',
          },
          { status: 400 },
        );
      }
      shortCode = customCode;
      const exists = await collection.findOne({ customCode: shortCode });
      if (exists) {
        return Response.json(
          {
            status: 'error',
            message: 'Custom code already exists',
          },
          { status: 409 },
        );
      }
    } else {
      // generate until unique (rare collision)
      do {
        shortCode = nanoid(6).replace(/[_-]/g, "a").slice(0, 6);
      } while (await collection.findOne({ customCode: shortCode }));
    }

    const now = new Date();
    const newLink = {
      title,
      url: normalizedUrl,
      description,
      customCode: shortCode,
      clickCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(newLink);

    return Response.json(
      {
        status: 'success',
        data: {
          id: result.insertedId.toString(),
          ...newLink,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/links error:', error);
    return Response.json(
      {
        status: 'error',
        message: 'Unable to create link',
        error: error.message,
      },
      { status: 500 },
    );
  }
}

