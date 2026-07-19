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

interface KidDashboardProps {
  user: User;
  books: Book[];
  booksLoading: boolean;
  onAddBook: (title: string, pageCount: number) => Promise<void>;
  onDeleteBook: (bookId: number) => Promise<void>;
  onLogout: () => void;
}

const funEmojis = ["🦁", "🐻", "🦊", "🐰", "🐼", "🐨", "🦄", "🐸", "🦋", "🐝", "🌈", "⭐", "🎈", "🎨", "🚀", "🎪"];

function getRandomEmoji(index: number) {
  return funEmojis[index % funEmojis.length];
}

function getBookBg(index: number) {
  const bgs = [
    "from-pink-100 to-purple-100 border-pink-200",
    "from-blue-100 to-emerald-100 border-blue-200",
    "from-amber-100 to-rose-100 border-amber-200",
    "from-emerald-100 to-cyan-100 border-emerald-200",
    "from-purple-100 to-pink-100 border-purple-200",
  ];
  return bgs[index % bgs.length];
}

export default function KidDashboard({
  user,
  books,
  booksLoading,
  onAddBook,
  onDeleteBook,
  onLogout,
}: KidDashboardProps) {
  const [title, setTitle] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [adding, setAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

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

  const getMilestone = () => {
    if (books.length === 0) return null;
    if (books.length >= 20) return { emoji: "🏆", text: "تو یه قهرمان واقعی کتاب‌خوانی هستی!" };
    if (books.length >= 10) return { emoji: "🌟", text: "آفرین قهرمان! ۱۰ تا کتاب عالی خوندی!" };
    if (books.length >= 5) return { emoji: "🎉", text: "هورااا! ۵ تا کتاب قشنگ خوندی!" };
    if (books.length >= 3) return { emoji: "😊", text: "خیلی عالیه! داری با سرعت پیش میری!" };
    if (books.length >= 1) return { emoji: "👏", text: "شروع فوق‌العاده‌ای بود!" };
    return null;
  };

  const milestone = getMilestone();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="absolute top-5 right-8 text-5xl animate-bounce opacity-30">🌈</div>
      <div className="absolute top-20 left-12 text-4xl animate-pulse opacity-25">⭐</div>
      <div className="absolute bottom-20 right-16 text-5xl animate-bounce opacity-20">🎈</div>
      <div className="absolute bottom-10 left-8 text-4xl animate-pulse opacity-25">🦋</div>

      {/* Header */}
      <header className="bg-gradient-to-l from-yellow-400 via-orange-400 to-pink-400 text-white shadow-lg relative">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center text-3xl border-2 border-white/40">
              👦
            </div>
            <div>
              <h1 className="text-xl font-bold">سلام {user.name} قشنگم! 🎉</h1>
              <p className="text-white/95 text-sm">بیا کتاب‌هایی که خوندی رو ثبت کنیم! 📖</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-white/25 hover:bg-white/40 text-white px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer border border-white/30"
          >
            🚪 خروج از برنامه
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 relative z-10">
        {/* Milestone Badge */}
        {milestone && (
          <div className="bg-gradient-to-l from-yellow-200 via-orange-100 to-pink-100 rounded-3xl p-4 mb-6 border-2 border-yellow-300 shadow-md flex items-center gap-3">
            <div className="text-4xl">{milestone.emoji}</div>
            <p className="font-bold text-orange-800 text-lg">{milestone.text}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/90 rounded-3xl p-5 shadow-md border-2 border-pink-300 text-center">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-4xl font-bold text-pink-500">{books.length}</div>
            <div className="text-slate-600 text-sm font-bold mt-1">کتاب خوندم!</div>
          </div>
          <div className="bg-white/90 rounded-3xl p-5 shadow-md border-2 border-blue-300 text-center">
            <div className="text-4xl mb-2">📄</div>
            <div className="text-4xl font-bold text-blue-500">{totalPages.toLocaleString("fa-IR")}</div>
            <div className="text-slate-600 text-sm font-bold mt-1">صفحه مطالعه کردم!</div>
          </div>
        </div>

        {/* Stars tracker */}
        {books.length > 0 && (
          <div className="bg-white/70 rounded-3xl p-4 mb-6 border-2 border-yellow-300/40 shadow-sm">
            <p className="text-slate-700 font-bold text-sm mb-2 text-center">⭐ ستاره‌های طلایی من</p>
            <div className="flex flex-wrap justify-center gap-1">
              {books.map((_, i) => (
                <span key={i} className="text-2xl">⭐</span>
              ))}
            </div>
          </div>
        )}

        {/* Add Book Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-gradient-to-l from-green-400 to-emerald-500 text-white rounded-3xl p-5 font-bold text-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] mb-6 cursor-pointer flex items-center justify-center gap-3 border-2 border-green-300"
          >
            <span className="text-3xl">📖</span>
            یه کتاب جدید خوندم! (اضافه کردن)
          </button>
        )}

        {/* Add Book Form */}
        {showForm && (
          <div className="bg-white/95 rounded-3xl p-6 shadow-lg border-2 border-yellow-300 mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 justify-center">
              🎉 کتاب جدید رو بنویس!
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-700 text-sm font-bold mb-2">
                  📕 اسم کتاب چی بود؟
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="اینجا بنویس..."
                  className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-2xl px-4 py-4 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-bold mb-2">
                  📄 چند صفحه بود کلش؟
                </label>
                <input
                  type="number"
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                  placeholder="مثلاً ۱۲"
                  min="1"
                  className="w-full bg-blue-50 border-2 border-blue-200 rounded-2xl px-4 py-4 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-lg"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 bg-gradient-to-l from-green-400 to-emerald-500 text-white rounded-2xl py-4 font-bold text-lg transition-all hover:shadow-md disabled:opacity-50 cursor-pointer border border-green-300"
                >
                  {adding ? "⏳ صبر کن..." : "✅ ثبت کن!"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 bg-slate-100 text-slate-500 rounded-2xl py-4 font-bold transition-all hover:bg-slate-200 cursor-pointer"
                >
                  بیخیال
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Books List */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 justify-center">
            📚 کتاب‌های قشنگی که خوندم
          </h2>
          {booksLoading ? (
            <div className="text-center py-10">
              <p className="text-slate-500 font-bold">داره لود میشه...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16 bg-white/60 rounded-3xl border-2 border-dashed border-yellow-300">
              <div className="text-7xl mb-4">📭</div>
              <p className="text-slate-600 text-xl font-bold">هنوز هیچ کتابی ثبت نکردی!</p>
              <p className="text-slate-400 mt-2">روی دکمه بالا بزن و اولین کتابت رو بنویس 🎈</p>
            </div>
          ) : (
            <div className="space-y-4">
              {books.map((book, index) => (
                <div
                  key={book.id}
                  className={`bg-gradient-to-l ${getBookBg(index)} rounded-3xl p-5 shadow-sm border-2 flex items-center gap-4 hover:shadow-md transition-all group`}
                >
                  <div className="w-14 h-14 bg-white/70 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm">
                    {getRandomEmoji(index)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-lg truncate">{book.title}</h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                      📄 {book.pageCount.toLocaleString("fa-IR")} صفحه قشنگ
                    </p>
                  </div>
                  {deleteConfirm === book.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onDeleteBook(book.id);
                          setDeleteConfirm(null);
                        }}
                        className="text-xs bg-red-100 text-red-600 px-3 py-2 rounded-xl font-bold hover:bg-red-200 cursor-pointer transition-all"
                      >
                        بله پاک شه
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="text-xs bg-slate-100 text-slate-500 px-3 py-2 rounded-xl font-bold hover:bg-slate-200 cursor-pointer transition-all"
                      >
                        خیر
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(book.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-xl cursor-pointer text-lg"
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
