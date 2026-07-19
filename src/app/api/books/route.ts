import { NextResponse } from "next/server";
import { db } from "@/db";
import { books } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }
    const userBooks = await db
      .select()
      .from(books)
      .where(eq(books.userId, parseInt(userId)))
      .orderBy(desc(books.createdAt));
    return NextResponse.json({ books: userBooks });
  } catch (error) {
    console.error("Get books error:", error);
    return NextResponse.json({ error: "Failed to get books" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, pageCount } = body;
    if (!userId || !title || !pageCount) {
      return NextResponse.json(
        { error: "userId, title, and pageCount are required" },
        { status: 400 }
      );
    }
    const [newBook] = await db
      .insert(books)
      .values({
        userId: parseInt(userId),
        title,
        pageCount: parseInt(pageCount),
      })
      .returning();
    return NextResponse.json({ book: newBook });
  } catch (error) {
    console.error("Create book error:", error);
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("id");
    if (!bookId) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    await db.delete(books).where(eq(books.id, parseInt(bookId)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete book error:", error);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}
