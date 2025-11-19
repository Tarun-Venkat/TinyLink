import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const DATABASE_NAME = 'projects';
const COLLECTION_NAME = 'tinylink';

export async function DELETE(_request, { params }) {
  try {
    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
      return Response.json(
        {
          status: 'error',
          message: 'A valid link id is required',
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json(
        {
          status: 'error',
          message: 'Link not found',
        },
        { status: 404 },
      );
    }

    return Response.json({
      status: 'success',
      message: 'Link deleted successfully',
    });
  } catch (error) {
    console.error('DELETE /api/links/[id] error:', error);
    return Response.json(
      {
        status: 'error',
        message: 'Unable to delete link',
        error: error.message,
      },
      { status: 500 },
    );
  }
}




export async function GET(_request, { params }) {
  try {
    const { id } = params;

    if (!id || typeof id !== "string") {
      return Response.json(
        { status: "error", message: "A valid link id or code is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Try to find by customCode or ObjectId
    let link = await collection.findOne({
      $or: [
        { customCode: id },
        ObjectId.isValid(id) ? { _id: new ObjectId(id) } : null,
      ].filter(Boolean)
    });

    if (!link) {
      return Response.json(
        { status: "error", message: "Link not found" },
        { status: 404 }
      );
    }

    // Redirect to target URL
    return Response.json({status:'success' , data:link});
  } catch (error) {
    console.error("GET /api/links/[id] error:", error);
    return Response.json(
      {
        status: "error",
        message: "Unable to fetch or redirect link",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

