import { redirect, notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';

const DATABASE_NAME = 'projects';
const COLLECTION_NAME = 'tinylink';

export default async function RedirectPage({ params }) {
  const { code } = params;

  // FIX: browser always requests favicon
  if (code === "favicon.ico") return;

  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  const collection = db.collection(COLLECTION_NAME);

  const link = await collection.findOne({ customCode: code });

  if (!link) {
    return notFound();     // or redirect('/')
  }

  await collection.updateOne(
    { customCode: code },
    { 
      $inc: { clickCount: 1 },
      $set: { lastClickedAt: new Date() }
    }
  );

  return redirect(link.url);
}
