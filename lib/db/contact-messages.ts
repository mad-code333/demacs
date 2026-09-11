import type { ContactInput } from "@/lib/validation/contact";
import { getDb } from "@/lib/mongodb";

const COLLECTION = "contact_messages";

export type ContactMessageDoc = ContactInput & {
  createdAt: Date;
};

export async function saveContactMessage(input: ContactInput): Promise<void> {
  const db = await getDb();
  await db.collection<ContactMessageDoc>(COLLECTION).insertOne({
    ...input,
    createdAt: new Date(),
  });
}
