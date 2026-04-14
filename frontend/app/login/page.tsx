"use client"; // クライアント側で動くコンポ―ネントであることを宣言

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Mail } from "lucide-react";

//バリデーションルール（スキーマ）を定義
const loginSchema = z.object({
    email: z.string().email({ message: "正しいメールアドレスを入力してください。"}),
    password: z.string().min(8,{ message: "パスワードは8文字以上である必要があります。" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage(){
    //react-hook-formの初期化
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } =useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    //送信時の処理
    const onSubmit = async (data: LoginFormValues) => {
        console.log("送信データ：", data);
        //TODO:axiosでbackendに飛ばす
        await new Promise((resolve) => setTimeout(resolve,100)); //通信のシュミレーション
        alert("ログインを試みます（コンソールを確認してください）");
    };

    return (   
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center">
                    <h2 className="text-3xl front-extrabold text-slate-900">
                        おかえりなさい！
                    </h2>
                    <p className="mt-2 text-slate-500">情報を入力してログインしてください</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/*メールアドレス入力*/}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-state-700 mb-2">
                            <Mail size={16} />メールアドレス
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className={`w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2
                                ${errors.email ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"}`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>}
                    </div>
                    {/*パスワード入力*/}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-style-700 mb-2">
                            <Lock size={16} />
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            className={`w-full px-4 py-3 rounded-lg border transition-all outline none focus:ring-2
                            ${errors.password ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"}`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform active:scale-[0.98] disabled:cursor-not-allowed shadow-blue-200"
                    >
                        {isSubmitting ? "処理中..." : "ログイン"}
                    </button>
                </form>
            </div>
        </div>
    );
};