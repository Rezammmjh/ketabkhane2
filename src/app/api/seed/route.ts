import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const DEFAULT_USERS = ["رضا", "مامانمه", "محمد جواد"];

export async function POST() {
  try {
    for (const name of DEFAULT_USERS) {
      const existing = await db.select().from(users).where(eq(users.name, name));
      if (existing.length === 0) {
        await db.insert(users).values({ name });
      }
    }
    const allUsers = await db.select().from(users);
    return NextResponse.json({ users: allUsers });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed users" }, { status: 500 });
  }
}
