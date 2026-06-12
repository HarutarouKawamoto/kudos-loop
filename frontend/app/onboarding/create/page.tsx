"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter as useNextRouter } from "next/navigation";
import { PlusCircle, ArrowLeft, Copy ,Check ,ShieldCheck } from "lucide-react";
import axios from "axios";

const teamSchema = z.object({
    teamName: z.string().min(1,{ message: "チーム名を入力してください。"}),
});
type TeamFormValues = z.infer<typeof teamSchema>;

export default function CreateTeamPage() {
    const router =useNextRouter();
    const [inviteCode,setInviteCode] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TeamFormValues>({
        resolver: zodResolver(teamSchema),
     });
    
    const onSubmit = async (data: TeamFormValues) => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await axios.post(
                "http://localhost:3001/teams",
                { name: data.teamName },
                { headers: { Authorization: `Bearer ${token}`} }        
            );

            setInviteCode(response.data.inviteCode);
        } catch (error: unknown) {
            console.error("チーム作成失敗:", error);
            alert("チームの作成に失敗しました。再度お試しください。");          
        } 
    };

    const copyToClipboard = () => {
        if (!inviteCode) return;
        navigator.clipboard.writeText(inviteCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
        
   return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-slate-100">
        
        {/* 戻るボタン */}
        <button
          onClick={() => router.push("/onboarding")}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={16} /> 選択画面に戻る
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">チームの新規作成</h2>
          <p className="mt-2 text-slate-500">管理者として新しいチームを開設します</p>
        </div>

        {/* 招待コードがまだ発行されていない（作成前）場合 */}
        {!inviteCode ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                チーム名
              </label>
              <input
                {...register("teamName")}
                type="text"
                className={`w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2
                  ${errors.teamName ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"}`}
                placeholder="例: 開発第1グループ, マル秘プロジェクト"
              />
              {errors.teamName && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.teamName.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md disabled:opacity-50"
            >
              <PlusCircle size={20} />
              {isSubmitting ? "チームを作成中..." : "チームを作成してコードを発行"}
            </button>
          </form>
        ) : (
          /* 招待コードが発行された（作成成功後）場合 */
          <div className="space-y-6 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">チーム作成が完了しました！</h3>
              <p className="text-xs text-slate-500 mt-1">メンバーを招待するためのコードです</p>
            </div>

            {/* コード表示・コピーエリア */}
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200 font-mono text-lg justify-between shadow-inner">
              <span className="text-blue-700 font-bold select-all">{inviteCode}</span>
              <button
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                title="コードをコピー"
              >
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all shadow-md"
            >
              ダッシュボードへ移動する
            </button>
          </div>
        )}
      </div>
    </div>
  );
}