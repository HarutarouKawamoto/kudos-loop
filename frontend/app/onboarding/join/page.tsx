"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {LogIn, ArrowLeft, Users} from "lucide-react";
import axios from "axios";

const joinSchema = z.object({
    inviteCode: z.string().min(1,{ message: "招待コードを入力してください。"}).length(8,{ message: "招待コードは8文字である必要があります。"}),
});
type JoinFormValues = z.infer<typeof joinSchema>;

export default function JoinTeamPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<JoinFormValues>({
        resolver: zodResolver(joinSchema),
    });

    const onSubmit = async (data: JoinFormValues) => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:3001/teams/join",
                { inviteCode: data.inviteCode },
                { headers: { Authorization: `Bearer ${token}` } }
            );
                alert("チームへの参加に成功しました！");
            router.push("/dashboard");
        } catch (error: unknown) {
            console.error("チーム参加失敗:", error);
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                alert("招待コードが正しくありません。");
            } else {
                alert("チームへの参加に失敗しました。再度お試しください。");
            }
        }
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
          <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
            <Users size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">チームに参加する</h2>
          <p className="mt-2 text-slate-500">共有された招待コードを入力してください</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              招待コード
            </label>
            <input
              {...register("inviteCode")}
              type="text"
              maxLength={8}
              className={`w-full px-4 py-3 rounded-lg border font-mono text-center text-xl tracking-widest transition-all outline-none focus:ring-2
                ${errors.inviteCode ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-green-100 focus:border-green-400"}`}
              placeholder="a1b2c3d4"
            />
            {errors.inviteCode && (
              <p className="mt-1 text-xs text-red-500 font-medium text-left">{errors.inviteCode.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all shadow-md disabled:opacity-50"
          >
            <LogIn size={20} />
            {isSubmitting ? "チームに参加中..." : "チームに参加する"}
          </button>
        </form>
      </div>
    </div>
  );
}