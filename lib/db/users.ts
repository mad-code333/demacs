import type { Collection, ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type UserDocument = {
  _id?: ObjectId;
  kickUserId: number;
  /** Handle returned by Kick OAuth (verified). */
  kickUsername: string;
  /** User-entered Kick.com name / display handle at registration. */
  kickDisplayName: string | null;
  roobetUsername: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const COL = "users";
let indexesEnsured = false;

async function usersCollection(): Promise<Collection<UserDocument>> {
  const db = await getDb();
  const col = db.collection<UserDocument>(COL);
  if (!indexesEnsured) {
    try {
      await col.createIndex({ kickUserId: 1 }, { unique: true });
    } catch {
      /* index already exists */
    }
    indexesEnsured = true;
  }
  return col;
}

export function isProfileComplete(doc: Pick<UserDocument, "kickDisplayName" | "roobetUsername"> | null) {
  if (!doc) return false;
  return Boolean(doc.kickDisplayName?.trim() && doc.roobetUsername?.trim());
}

export async function findUserByKickId(kickUserId: number): Promise<UserDocument | null> {
  const col = await usersCollection();
  return col.findOne({ kickUserId });
}

export async function upsertUserFromKickOAuth(kickUserId: number, kickUsername: string): Promise<UserDocument> {
  const col = await usersCollection();
  const now = new Date();
  await col.updateOne(
    { kickUserId },
    {
      $set: { kickUsername, updatedAt: now },
      $setOnInsert: {
        kickDisplayName: null,
        roobetUsername: null,
        createdAt: now,
      },
    },
    { upsert: true },
  );
  const doc = await col.findOne({ kickUserId });
  if (!doc) {
    throw new Error("user_upsert_read_failed");
  }
  return doc;
}

export async function saveUserRegistration(
  kickUserId: number,
  kickUsername: string,
  input: { kickDisplayName: string; roobetUsername: string },
): Promise<void> {
  const col = await usersCollection();
  const now = new Date();
  await col.updateOne(
    { kickUserId },
    {
      $set: {
        kickUsername,
        kickDisplayName: input.kickDisplayName,
        roobetUsername: input.roobetUsername,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );
}
