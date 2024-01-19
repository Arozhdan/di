import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Typography } from "@/shared/components/Typography/Typography";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import { Navbar } from "@/widgets/Navbar";
import { AlertOctagonIcon, ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { RoutePath } from "@/app/providers/Router";

const formSchema = z.object({
  input: z
    .string()
    .min(50, "Минимум 10 символов")
    .max(400, "Максимум 400 символов"),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  input: "",
};

const CreateTemplate = () => {
  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <>
      <Navbar>
        <div className="lg:px-5 mr-2">
          <Link
            className={cn(
              buttonVariants({
                variant: "link",
                size: "sm",
              }),
              "px-0"
            )}
            to={RoutePath.templates}
          >
            <ArrowLeftIcon size={12} className="mr-1 mt-0.5" />
            Templates
          </Link>
        </div>
      </Navbar>
      <div className="page">
        <div className="flex space-x-2 items-center text-destructive">
          <AlertOctagonIcon size={12} />
          <span className="text-xs">
            Beta feature. Please use with caution.
          </span>
        </div>
        <Typography variant="sectionTitle">Create Template</Typography>

        <Typography className="text-gray-500 max-w-3xl mb-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Sed Lorem ipsum
          dolor sit amet consectetur, adipisicing elit. Sed consectetur,
          adipisicing elit. Sed Lorem ipsum dolor sit amet consectetur, adipisic
          consectetur, adipisicing elit. Sed Lorem ipsum dolor sit amet
          consectetur, adipisic dolor sit amet consectetur, adipisicing elit.
          Sed
        </Typography>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="input"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-48 resize-none"
                      placeholder="Type your template here..."
                    />
                  </FormControl>
                  <FormDescription>
                    Lorem ipsum dolor, sit amet consectetur{" "}
                    <code className="bg-gray-100 text-gray-900 text-xs">
                      &lt;input&gt;
                    </code>{" "}
                    repellat repudiandae eligendi aut est sint! Aperiam, nobis,
                    ipsum impedit ullam aliquam optio corporis ab quis
                    consequatur dicta dolore in{" "}
                    <code className="bg-gray-100 text-gray-900 text-xs">
                      &lt;language&gt;
                    </code>{" "}
                    language.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Create Template
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateTemplate;
