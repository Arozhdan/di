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
import { signinLocal } from "@/features/AuthLocal";
import { useSelector } from "react-redux";
import { selectIsLocalSigninLoading } from "@/features/AuthLocal";
import { Link, useNavigate } from "react-router-dom";
import { selectAuthenticated } from "@/entities/User";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const Signin = () => {
  const dispatch = useAppDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authenticated);

    if (authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  const [email, setEmail] = useState("");
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
      setEmail(email);
      form.setValue("email", email);
    }
  }, [form]);

  const clearEmail = () => {
    setEmail("");
    form.setValue("password", "");
    localStorage.removeItem(LOCAL_STORAGE.SIGNIN_EMAIL);
  };

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
          />
        </div>
        <div className="text-white relative z-10 pb-10 px-8 flex space-x-6">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center py-6 px-4 lg:px-10">
        <div>
          <Typography variant="sectionTitle" className="text-center">
            Sign in
          </Typography>
          <p className="max-w-md text-center mt-3 text-gray-500">
            Sign in to your account to continue. If you don't have an account,
            you can{" "}
            <a href="#" className="text-blue-500 hover:underline">
              create one.
            </a>
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="spy-4 my-6 max-w-md"
            >
              <div
                className={cn({
                  hidden: !!email,
                })}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@example.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={() => setEmail(form.getValues("email"))}
                  className="mt-2 w-full"
                  disabled={
                    !form.formState.dirtyFields.email &&
                    !form.getValues("email")
                  }
                >
                  Sign In with Email
                </Button>
                <Link
                  to={"/"}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "mt-1 w-full"
                  )}
                >
                  Sign up
                </Link>
              </div>
              <div
                className={cn({
                  hidden: !email,
                })}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Password"
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
                <div className="">
                  <Button
                    type="submit"
                    className="mt-2 w-full"
                    loading={isLocalLoading}
                    disabled={isLocalLoading}
                  >
                    Sign In {isLocalLoading && "..."}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full mt-1"
                    onClick={clearEmail}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </form>
            <div className="relative flex justify-center w-full max-w-md mb-6">
              <div className="text-gray-500 relative z-10 bg-background px-4 uppercase text-xs">
                Or continue with
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
              By continuing, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
