import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('tinylink');
    
    // Test database connection
    const collections = await db.listCollections().toArray();
    
    return Response.json({
      status: 'success',
      message: 'MongoDB connection successful!',
      database: 'tinylink',
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return Response.json(
      {
        status: 'error',
        message: 'Failed to connect to MongoDB',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

