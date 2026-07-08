"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import pb from "@/lib/pocketbase";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ---------------------------------------------------------------------------
// Схемы валидации (Zod)
// ---------------------------------------------------------------------------
const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
});

const registerSchema = z
  .object({
    name: z.string().min(1, "Введите имя"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
    passwordConfirm: z.string().min(8, "Подтвердите пароль"),
    coupon: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Пароли не совпадают",
    path: ["passwordConfirm"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

// ---------------------------------------------------------------------------
// Страница авторизации
// ---------------------------------------------------------------------------
export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Форма входа
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Форма регистрации
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", passwordConfirm: "", coupon: "" },
  });

  // --- Обработчик входа ---
  const onLogin = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await pb.collection("users").authWithPassword(data.email, data.password);
      toast.success("Успешный вход!");
      router.push("/");
    } catch (err: unknown) {
      const error = err as { status?: number; data?: { message?: string } };
      const message =
        error?.data?.message || "Неверный email или пароль";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Обработчик регистрации ---
  const onRegister = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      let role: "player" | "master" = "player";
      let couponId: string | null = null;

      // 1. Если указан купон — проверяем его
      if (data.coupon && data.coupon.trim() !== "") {
        try {
          const coupon = await pb
            .collection("coupons")
            .getFirstListItem<{ id: string }>(
              `code="${data.coupon}" && active=true`
            );
          couponId = coupon.id;
          role = "master";
        } catch {
          toast.error("Неверный или неактивный купон мастера!");
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Создаём пользователя
      const newUser = await pb.collection("users").create<{ id: string }>({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        name: data.name,
        role,
      });

      // 3. Автоматически авторизуем после создания
      await pb.collection("users").authWithPassword(data.email, data.password);

      // 4. Если был купон — деактивируем его
      if (couponId) {
        await pb.collection("coupons").update(couponId, {
          active: false,
          usedBy: newUser.id,
        });
      }

      toast.success("Регистрация успешна!");
      router.push("/");
    } catch (err: unknown) {
      const error = err as { status?: number; data?: { message?: string } };
      const message =
        error?.data?.message || "Ошибка при регистрации. Попробуйте снова.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Обработчик входа через OAuth2 (Яндекс / Google) ---
  const handleOAuth2Login = async (provider: "google" | "yandex") => {
    try {
      await pb.collection("users").authWithOAuth2({
        provider,
        createData: {
          role: "player",
        },
      });
      if (pb.authStore.isValid) {
        toast.success(
          `Успешный вход через ${provider === "yandex" ? "Яндекс" : "Google"}!`
        );
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Не удалось войти через сторонний сервис");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-7.8rem)] items-center justify-center px-[2rem]">
      <Card className="w-full max-w-[42rem] border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-heading-3 text-white">
            Подземелья Пединбурга
          </CardTitle>
          <CardDescription className="text-body-medium text-muted-foreground">
            Войдите или создайте аккаунт
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as "login" | "register")}
          >
            <TabsList className="mb-[2.4rem] grid w-full grid-cols-2 bg-zinc-800">
              <TabsTrigger
                value="login"
                className="text-label data-[state=active]:bg-zinc-950 data-[state=active]:text-white"
              >
                Вход
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="text-label data-[state=active]:bg-zinc-950 data-[state=active]:text-white"
              >
                Регистрация
              </TabsTrigger>
            </TabsList>

            {/* ========== ВКЛАДКА "ВХОД" ========== */}
            <TabsContent value="login">
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLogin)}
                  className="space-y-[2rem]"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-label text-foreground">Почта</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@mail.ru"
                            className="text-body-medium border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-body-small text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-label text-foreground">Пароль</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••"
                            className="text-body-medium border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-body-small text-red-400" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#D9298F] text-white hover:bg-[#D9298F]/90 text-label-bold"
                  >
                    {isSubmitting ? "Вход..." : "Войти"}
                  </Button>
                </form>
              </Form>

              {/* Разделитель */}
              <div className="relative my-[2.4rem] flex items-center">
                <div className="flex-grow border-t border-zinc-800"></div>
                <span className="mx-[1.2rem] flex-shrink-0 text-body-small text-zinc-500">
                  или войти через
                </span>
                <div className="flex-grow border-t border-zinc-800"></div>
              </div>

              {/* Кнопки OAuth2 */}
              <div className="flex flex-col gap-[1.2rem]">
                <button
                  type="button"
                  onClick={() => handleOAuth2Login("yandex")}
                  className="flex h-[4.2rem] w-full items-center justify-center gap-[0.8rem] rounded-md border border-zinc-800 bg-zinc-900 px-[1.6rem] text-label text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" rx="4" fill="#FC3F1D" />
                    <text
                      x="12"
                      y="16"
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      Я
                    </text>
                  </svg>
                  Войти через Яндекс
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuth2Login("google")}
                  className="flex h-[4.2rem] w-full items-center justify-center gap-[0.8rem] rounded-md border border-zinc-800 bg-zinc-900 px-[1.6rem] text-label text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Войти через Google
                </button>
              </div>
            </TabsContent>

            {/* ========== ВКЛАДКА "РЕГИСТРАЦИЯ" ========== */}
            <TabsContent value="register">
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegister)}
                  className="space-y-[2rem]"
                >
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-label text-foreground">Имя</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ваше имя"
                            className="text-body-medium border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-body-small text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-label text-foreground">Почта</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@mail.ru"
                            className="text-body-medium border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-body-small text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-label text-foreground">Пароль</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Минимум 8 символов"
                            className="text-body-medium border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-body-small text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-label text-foreground">
                          Подтверждение пароля
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Повторите пароль"
                            className="text-body-medium border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-body-small text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="coupon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-label text-muted-foreground">
                          Секретный купон мастера{" "}
                          <span className="text-muted-foreground/60">(необязательно)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите код купона"
                            className="text-body-medium border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-body-small text-red-400" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#D9298F] text-white hover:bg-[#D9298F]/90 text-label-bold"
                  >
                    {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
