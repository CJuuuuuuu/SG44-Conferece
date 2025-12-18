// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          SG44 研討會管理系統
        </h1>
        <p className="text-xl text-gray-600 mb-8">智測國土 X 韌啟未來</p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            登入系統
          </Link>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition"
          >
            註冊帳號
          </Link>
        </div>
      </div>
    </div>
  );
}
