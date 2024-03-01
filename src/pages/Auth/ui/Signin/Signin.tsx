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
import { LOCAL_STORAGE } from "@/shared/lib/consts";
import { EyeIcon } from "lucide-react";
import { selectLocalAuthError, signinLocal } from "@/features/AuthLocal";
import { useSelector } from "react-redux";
import { selectIsLocalSigninLoading } from "@/features/AuthLocal";
import { Link, useNavigate } from "react-router-dom";
import { selectAuthenticated } from "@/entities/User";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const Signin = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const navigate = useNavigate();
  const error = useSelector(selectLocalAuthError);
  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const isLocalLoading = useSelector(selectIsLocalSigninLoading);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const email = localStorage.getItem(LOCAL_STORAGE.SIGNIN_EMAIL);
    if (email) {
      form.setValue("email", email);
    }
  }, [form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    localStorage.setItem(LOCAL_STORAGE.SIGNIN_EMAIL, data.email);
    dispatch(signinLocal(data));
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
            {t("auth.signin.title")}
          </Typography>
          <p className="max-w-md text-center mt-3 text-gray-500">
            {t("auth.signin.subtitle")}
            <Link
              to="/signup"
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "underline px-1"
              )}
            >
              {t("auth.signin.signup")}
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
              {error && (
                <div className="text-primary text-sm mb-2">{error}</div>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      {t("auth.password")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder={t("auth.password")}
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
              <Button
                type="submit"
                className="w-full mt-2"
                loading={isLocalLoading}
              >
                {t("auth.signin.submit")}
              </Button>
            </form>
            <div className="relative flex justify-center w-full max-w-md mb-6">
              <div className="text-gray-500 relative z-10 bg-background px-4 uppercase text-xs">
                {t("auth.signin.or")}
              </div>
              <div className="absolute w-full h-px bg-accent top-1/2" />
            </div>
            <div className="max-w-md space-x-3 flex">
              <Button className="w-full" variant="outline" disabled>
                <img
                  className="w-5 h-5 mr-1"
                  src="/google-icon.png"
                  alt="Google"
                />
                Google
              </Button>
              <Button className="w-full" variant="outline" disabled>
                <img
                  className="w-5 h-5 mr-1"
                  src="/facebook-icon.svg"
                  alt="Google"
                />
                Facebook
              </Button>
            </div>
            <div className="max-w-md text-center mt-6 px-10 text-gray-500">
              {t("auth.signin.forgot")}
              <Link
                to="/forgot-password"
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "underline px-1"
                )}
              >
                {t("auth.signin.forgotLink")}
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
