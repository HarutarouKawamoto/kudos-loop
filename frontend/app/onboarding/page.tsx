"use client"

import { useRouter } from "next/navigation";
import {PlusCircle, LogIn, Users } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-slate-100 text-center">
        
        <div>
          <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Users size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">チームへの所属が必要です</h2>
          <p className="mt-2 text-slate-500">
            Kudos Loop を始めるために、まずはチームを作成するか、既存のチームに参加してください。
          </p>
        </div>

        {/* 2つの選択肢を並べるカードエリア */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* Aパターン: チーム作成へ */}
          <button
            onClick={() => router.push("/onboarding/create")}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-200 hover:border-blue-500 rounded-xl transition-all hover:shadow-md group text-center"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-500 group-hover:bg-blue-100 group-hover:text-blue-600 rounded-full flex items-center justify-center mb-4 transition-colors">
              <PlusCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">新しくチームを作る</h3>
            <p className="text-sm text-slate-500">
              あなたが管理者となり、新しいチームを開設して招待コードを発行します。
            </p>
          </button>

          {/* Bパターン: チーム参加へ */}
          <button
            onClick={() => router.push("/onboarding/join")}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-200 hover:border-green-500 rounded-xl transition-all hover:shadow-md group text-center"
          >
            <div className="w-12 h-12 bg-green-50 text-green-500 group-hover:bg-green-100 group-hover:text-green-600 rounded-full flex items-center justify-center mb-4 transition-colors">
              <LogIn size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">既存のチームに参加する</h3>
            <p className="text-sm text-slate-500">
              他のメンバーから共有された「招待コード」を入力して、チームに合流します。
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}