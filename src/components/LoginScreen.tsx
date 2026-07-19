"use client";

interface User {
  id: number;
  name: string;
}

interface LoginScreenProps {
  users: User[];
  onLogin: (user: User) => void;
}

const userAvatars: Record<string, string> = {
  "رضا": "👨",
  "مامانمه": "👩",
  "محمد جواد": "👦",
};

const userColors: Record<string, string> = {
  "رضا": "from-orange-400 to-red-500",
  "مامانمه": "from-rose-400 to-pink-500",
  "محمد جواد": "from-yellow-400 to-amber-500",
};

const userBorderColors: Record<string, string> = {
  "رضا": "border-orange-300 hover:border-orange-500",
  "مامانمه": "border-rose-300 hover:border-rose-500",
  "محمد جواد": "border-yellow-300 hover:border-yellow-500",
};

export default function LoginScreen({ users, onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-100 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 text-6xl opacity-20 animate-float">📖</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-20 animate-float" style={{ animationDelay: "1s" }}>📚</div>
      <div className="absolute top-1/4 left-20 text-4xl opacity-15 animate-float" style={{ animationDelay: "0.5s" }}>✨</div>
      <div className="absolute bottom-1/4 right-20 text-4xl opacity-15 animate-float" style={{ animationDelay: "1.5s" }}>🌟</div>

      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-7xl mb-4 animate-bounce-slow">📚</div>
          <h1 className="text-4xl font-bold text-warm-800 mb-2">کتابخانه ما</h1>
          <p className="text-warm-600 text-lg">کتاب‌هایی که خوانده‌ایم را ثبت کنیم</p>
        </div>

        {/* User Cards */}
        <div className="space-y-4">
          <p className="text-center text-warm-700 font-bold text-lg mb-2">👋 کی هستی؟</p>
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => onLogin(user)}
              className={`w-full bg-white/80 backdrop-blur-sm border-2 ${userBorderColors[user.name] || "border-warm-300 hover:border-warm-500"} rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer group`}
            >
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${userColors[user.name] || "from-warm-400 to-warm-600"} flex items-center justify-center text-3xl shadow-md group-hover:shadow-lg transition-shadow`}
              >
                {userAvatars[user.name] || "👤"}
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-xl font-bold text-warm-800">{user.name}</h3>
                <p className="text-warm-500 text-sm">برای ورود کلیک کن</p>
              </div>
              <div className="text-warm-400 group-hover:text-warm-600 transition-colors text-2xl">
                ←
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
