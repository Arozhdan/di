import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Typography } from "@/shared/components/Typography/Typography";
import { withSettingsLayout } from "@/widgets/SettingsLayout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { Textarea } from "@/shared/components/ui/textarea";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(50, {
      message: "Username must be less than 50 characters long",
    }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z
    .string()
    .regex(phoneRegex, {
      message: "Please enter a valid phone number",
    })
    .min(5, {
      message: "Please enter a valid phone number",
    })
    .max(20, {
      message: "Please enter a valid phone number",
    })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(10, {
      message: "Address must be at least 10 characters long",
    })
    .max(100, {
      message: "Address must be less than 100 characters long",
    })
    .optional()
    .or(z.literal("")),
});

export const Profile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="container px-0">
      <Typography variant="sectionSubtitle">Profile</Typography>
      <Typography className="text-gray-500 border-b pb-4">
        Manage your profile information, such as your name and email address.
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username*</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.username ? (
                    <span className="text-red-500 flex items-center">
                      <AlertCircleIcon
                        size={14}
                        className="inline-block mr-1"
                      />
                      {form.formState.errors.username.message}
                    </span>
                  ) : (
                    "This is the name that will be displayed on your profile."
                  )}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.email ? (
                    <span className="text-red-500 flex items-center">
                      <AlertCircleIcon
                        size={14}
                        className="inline-block mr-1"
                      />
                      {form.formState.errors.email.message}
                    </span>
                  ) : (
                    "E-mail address associated with your account."
                  )}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone{" "}
                  <span className="text-gray-500 text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 123 456 7890" {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.phone ? (
                    <span className="text-red-500 flex items-center">
                      <AlertCircleIcon
                        size={14}
                        className="inline-block mr-1"
                      />
                      {form.formState.errors.phone.message}
                    </span>
                  ) : (
                    "This is the name that will be displayed on your profile."
                  )}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Address
                  <span className="text-gray-500 text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.address ? (
                    <span className="text-red-500 flex items-center">
                      <AlertCircleIcon
                        size={14}
                        className="inline-block mr-1"
                      />
                      {form.formState.errors.address.message}
                    </span>
                  ) : (
                    "This is the name that will be displayed on your profile."
                  )}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button disabled={!form.formState.isDirty} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default withSettingsLayout(Profile);
