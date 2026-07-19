"use client";

import { useState, useEffect, useCallback } from "react";
import LoginScreen from "@/components/LoginScreen";
import Dashboard from "@/components/Dashboard";
import KidDashboard from "@/components/KidDashboard";

interface User {
  id: number;
  name: string;
}

interface Book {
  id: number;
  userId: number;
  title: string;
  pageCount: number;
  createdAt: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        await fetch("/api/seed", { method: "POST" });
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Init error:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const fetchBooks = useCallback(async (userId: number) => {
    setBooksLoading(true);
    try {
      const res = await fetch(`/api/books?userId=${userId}`);
      const data = await res.json();
      setBooks(data.books || []);
    } catch (err) {
      console.error("Fetch books error:", err);
    } finally {
      setBooksLoading(false);
    }
  }, []);

  const handleLogin = useCallback(
    (user: User) => {
      setCurrentUser(user);
      fetchBooks(user.id);
    },
    [fetchBooks]
  );

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setBooks([]);
  }, []);

  const handleAddBook = useCallback(
    async (title: string, pageCount: number) => {
      if (!currentUser) return;
      try {
        const res = await fetch("/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.id,
            title,
            pageCount,
          }),
        });
        if (res.ok) {
          fetchBooks(currentUser.id);
        }
      } catch (err) {
        console.error("Add book error:", err);
      }
    },
    [currentUser, fetchBooks]
  );

  const handleDeleteBook = useCallback(
    async (bookId: number) => {
      if (!currentUser) return;
      try {
        const res = await fetch(`/api/books?id=${bookId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchBooks(currentUser.id);
        }
      } catch (err) {
        console.error("Delete book error:", err);
      }
    },
    [currentUser, fetchBooks]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-100 via-warm-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-warm-700 text-lg font-bold">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginScreen users={users} onLogin={handleLogin} />;
  }

  const isKid = currentUser.name === "محمد جواد";

  if (isKid) {
    return (
      <KidDashboard
        user={currentUser}
        books={books}
        booksLoading={booksLoading}
        onAddBook={handleAddBook}
        onDeleteBook={handleDeleteBook}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Dashboard
      user={currentUser}
      books={books}
      booksLoading={booksLoading}
      onAddBook={handleAddBook}
      onDeleteBook={handleDeleteBook}
      onLogout={handleLogout}
    />
  );
}
