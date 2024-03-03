import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Typography } from "@/shared/components/Typography/Typography";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { cn, useAppDispatch } from "@/shared/lib/utils";
import { EyeIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectAuthenticated } from "@/entities/User";
import { useTranslation } from "react-i18next";
import {
  resetPassword,
  selectIsLocalSigninLoading,
} from "@/features/AuthLocal";
import { RoutePath } from "@/app/providers/Router";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  repeatPassword: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const Reset = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const isLocalLoading = useSelector(selectIsLocalSigninLoading);
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
    if (!token) {
      navigate(RoutePath.signin);
    }
  }, [authenticated, navigate, token]);

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.password !== data.repeatPassword) {
      form.setError("repeatPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    dispatch(
      resetPassword({
        password: data.password,
        token: token as string,
      })
    );
  };

  return (
    <div className="w-screen min-h-screen lg:grid grid-cols-2">
      <div className="h-screen relative hidden lg:flex flex-col justify-between">
        <img
          className="w-full h-full object-cover absolute inset-0"
          src="https://images.unsplash.com/photo-1673255745677-e36f618550d1?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="flex relative z-10 pt-10 px-8">
          <img
            src="/logo.svg"
            className="brightness-[100] max-w-[120px]"
            alt=""
          />{" "}
          <Button
            variant={"link"}
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "ru" : "en")
            }
            className="py-0 h-7 ml-auto text-white"
          >
            {i18n.language === "en" ? "RU" : "EN"}
          </Button>{" "}
        </div>
        <div className="text-white relative z-10 pb-10 px-8 flex space-x-6">
          <a href="/tos.pdf">{t("auth.tos")}</a>
          <a href="/privacy.pdf">{t("auth.privacy")}</a>
        </div>
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center py-6 px-4 lg:px-10">
        <div>
          <Typography variant="sectionTitle" className="text-center">
            {t("auth.reset.title")}
          </Typography>
          <p className="max-w-md text-center mt-3 text-gray-500">
            {t("auth.reset.subtitle")}
            <Link
              to={RoutePath.signin}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "underline px-1"
              )}
            >
              {t("auth.reset.signin")}
            </Link>
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  form.handleSubmit(onSubmit)();
                }
              }}
              className="spy-4 my-6 max-w-md"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      {t("auth.reset.newPassword")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder={t("auth.reset.newPassword")}
                          type={passwordType}
                          {...field}
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          type="button"
                          className="rounded-l-none absolute top-0 right-0 bottom-0"
                          onTouchStart={() => setPasswordType("text")}
                          onTouchEnd={() => setPasswordType("password")}
                          onMouseDown={() => setPasswordType("text")}
                          onMouseUp={() => setPasswordType("password")}
                        >
                          <EyeIcon size={12} />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      {t("auth.reset.repeatPassword")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder={t("auth.reset.repeatPassword")}
                          type={passwordType}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-2"
                loading={isLocalLoading}
              >
                {t("general.submit")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
