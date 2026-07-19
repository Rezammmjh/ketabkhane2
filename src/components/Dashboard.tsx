"use client";

import { useState } from "react";

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

interface DashboardProps {
  user: User;
  books: Book[];
  booksLoading: boolean;
  onAddBook: (title: string, pageCount: number) => Promise<void>;
  onDeleteBook: (bookId: number) => Promise<void>;
  onLogout: () => void;
}

const userAvatars: Record<string, string> = {
  "رضا": "👨",
  "مامانمه": "👩",
};

const userGradients: Record<string, string> = {
  "رضا": "from-orange-500 to-red-600",
  "مامانمه": "from-rose-500 to-pink-600",
};

export default function Dashboard({
  user,
  books,
  booksLoading,
  onAddBook,
  onDeleteBook,
  onLogout,
}: DashboardProps) {
  const [title, setTitle] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [adding, setAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const totalPages = books.reduce((sum, b) => sum + b.pageCount, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !pageCount.trim()) return;
    setAdding(true);
    await onAddBook(title.trim(), parseInt(pageCount));
    setTitle("");
    setPageCount("");
    setAdding(false);
    setShowForm(false);
  };

  const gradient = userGradients[user.name] || "from-warm-500 to-warm-700";
  const avatar = userAvatars[user.name] || "👤";

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-orange-50 to-amber-50">
      {/* Header */}
      <header className={`bg-gradient-to-l ${gradient} text-white shadow-lg`}>
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
              {avatar}
            </div>
            <div>
              <h1 className="text-xl font-bold">{user.name} عزیز</h1>
              <p className="text-white/80 text-sm">خوش آمدی! 📖</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all backdrop-blur-sm cursor-pointer"
          >
            خروج ←
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-warm-100">
            <div className="text-3xl mb-1">📚</div>
            <div className="text-3xl font-bold text-warm-800">{books.length}</div>
            <div className="text-warm-500 text-sm">کتاب خوانده شده</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-warm-100">
            <div className="text-3xl mb-1">📄</div>
            <div className="text-3xl font-bold text-warm-800">{totalPages.toLocaleString("fa-IR")}</div>
            <div className="text-warm-500 text-sm">صفحه مطالعه شده</div>
          </div>
        </div>

        {/* Add Book Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className={`w-full bg-gradient-to-l ${gradient} text-white rounded-2xl p-4 font-bold text-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] mb-6 cursor-pointer flex items-center justify-center gap-2`}
          >
            <span className="text-2xl">+</span>
            افزودن کتاب جدید
          </button>
        )}

        {/* Add Book Form */}
        {showForm && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-warm-100 mb-6">
            <h3 className="text-lg font-bold text-warm-800 mb-4 flex items-center gap-2">
              📝 کتاب جدید
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-warm-700 text-sm font-bold mb-1">
                  نام کتاب
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: شازده کوچولو"
                  className="w-full bg-warm-50 border border-warm-200 rounded-xl px-4 py-3 text-warm-800 placeholder-warm-300 focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-warm-700 text-sm font-bold mb-1">
                  تعداد صفحات
                </label>
                <input
                  type="number"
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                  placeholder="مثلاً: 120"
                  min="1"
                  className="w-full bg-warm-50 border border-warm-200 rounded-xl px-4 py-3 text-warm-800 placeholder-warm-300 focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={adding}
                  className={`flex-1 bg-gradient-to-l ${gradient} text-white rounded-xl py-3 font-bold transition-all hover:shadow-md disabled:opacity-50 cursor-pointer`}
                >
                  {adding ? "در حال ثبت..." : "✅ ثبت کتاب"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 bg-warm-100 text-warm-600 rounded-xl py-3 font-bold transition-all hover:bg-warm-200 cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Books List */}
        <div>
          <h2 className="text-lg font-bold text-warm-800 mb-4 flex items-center gap-2">
            📖 کتاب‌های من
          </h2>
          {booksLoading ? (
            <div className="text-center py-10">
              <div className="text-4xl animate-bounce-slow mb-2">📚</div>
              <p className="text-warm-500">در حال بارگذاری...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16 bg-white/60 rounded-2xl border border-warm-100">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-warm-500 text-lg font-bold">هنوز کتابی ثبت نشده!</p>
              <p className="text-warm-400 text-sm mt-1">اولین کتابت رو اضافه کن</p>
            </div>
          ) : (
            <div className="space-y-3">
              {books.map((book, index) => (
                <div
                  key={book.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-warm-100 flex items-center gap-4 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-warm-200 to-warm-300 rounded-xl flex items-center justify-center text-lg font-bold text-warm-700 shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-warm-800 truncate">{book.title}</h3>
                    <p className="text-warm-500 text-sm">
                      {book.pageCount.toLocaleString("fa-IR")} صفحه
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteBook(book.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-2 hover:bg-red-50 rounded-xl cursor-pointer"
                    title="حذف کتاب"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
