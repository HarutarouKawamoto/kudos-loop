"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
    name: z.string().min(1, { message: "名前を入力してください。"}),
    email:z.string().email({ message: "正しいメールアドレスを入力してください。"}),
    password: z.string().min(8, { message: "パスワードは8文字以上である必要があります。"}),
    confirmPassword: z.string().min(1, {message:"パスワード（確認要）を入力してください。"}),

}).refine((data) => data.password === data.confirmPassword,{
    message: "パスワードが一致しません。",
    path: ["conirmPassword"],// エラーの場所を指定

});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormValues) => {
        try {
            await axios.post("http://localhost:3001/auth/signup", {
                name:data.name,
                email: data.email,
                password: data.password,
            });

            alert("ユーザ登録が完了しました！ログインしてください。");
            router.push("/login"); // 登録後にログインページへ遷移
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("サインアップに失敗：", error.response?.data);
                alert(error.response?.data?.message || "登録に失敗しました。既に登録されている可能性があります。")
            } else {
                console.error("予期せぬエラーが発生:", error);
                alert("予期せぬエラーが発生しました。");
            }
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900">アカウント作成</h2>
                    <p className="mt-2 text-slate-500">kudos Loopへようこそ！</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* 名前入力 */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                            <UserPlus size={16} />名前
                        </label>
                        <input
                            {...register("name")}
                            type="text"
                            className={`w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2
                              ${errors.name ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"}`}
                            placeholder="山田 太郎"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500 font-semibold ">{errors.name.message}</p>}
                    </div>

                    {/* メールアドレス入力 */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium">
                           <Mail size={16} />メールアドレス
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className={`w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2
                                ${errors.email ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"}`}
                            placeholder="you@example.com"
                        />
                        {errors.email &&  <p className="mt-1 text-xs text-red-500 font-medium ">{errors.email.message}</p>}
                    </div>

                    {/* パスワード入力 */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semedium text-style">
                            <Lock size={16} />パスワード
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            className={`w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2
                                ${errors.password ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"}`}
                            placeholder="********"
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-500 font-medium ">{errors.password.message}</p>}
                    </div>
                                                        


                    {/* パスワード確認入力 */}
                    <div>
                       <label className="flex items-center gap-2 text-sm font-semedium text-slate-700 mb-2">
                            <Lock size={16} />パスワード（確認用）
                        </label>
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            className={`w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2
                                ${errors.confirmPassword ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"}`}
                            placeholder="********"
                        />
                        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500 font-medium ">{errors.confirmPassword.message}</p>}
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex item-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 shadow-md"
                    >
                        <UserPlus size={20} />
                        {isSubmitting ? "登録中...":"アカウント作成する"}

                    </button>
                </form>
                    
                <div className="text-sm text-slate-500">
                    <p className="text-sm text-slate-500">
                        既にアカウントをお持ちですか？{" "}
                        <button onClick={() => router.push("/login")} className="text-blue-600 font-semilbold hover:underline">
                            ログイン
                        </button>
                    </p>
                </div>
            </div>    
        </div>    

            
    )
}