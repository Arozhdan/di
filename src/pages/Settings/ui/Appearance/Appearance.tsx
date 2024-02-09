import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  language: z.enum(["en", "ru"], {
    required_error: "Please select a language.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

import { Typography } from "@/shared/components/Typography/Typography";
import { withSettingsLayout } from "@/widgets/SettingsLayout";
import { cn } from "@/shared/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useTranslation } from "react-i18next";

export const Appearance = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const defaultValues: AppearanceFormValues = {
    theme,
    language: i18n.language as "en" | "ru",
  };
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  function onSubmit(data: AppearanceFormValues) {
    const { theme, language } = data;
    i18n.changeLanguage(language);
    setTheme(theme);
    form.reset(data);
  }

  // const isDarkPreferred = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div className="container px-0">
      <Typography variant="sectionSubtitle">
        {t("general.appearance")}
      </Typography>
      <Typography className="text-gray-500 border-b pb-4">
        {t("settings.appearance_subtitle")}
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("general.language")}</FormLabel>
                <div className="relative w-max">
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-[200px] appearance-none bg-transparent font-normal"
                      )}
                      {...field}
                    >
                      <option value="en">{t("general.en")}</option>
                      <option value="ru">{t("general.ru")}</option>
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>{t("general.theme")}</FormLabel>
                <FormDescription>{t("settings.theme_desc")}</FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid max-w-2xl md:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-y-8 gap-x-8 pt-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="light" className="sr-only" />
                      </FormControl>
                      <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                          <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        {t("general.light")}
                      </span>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only" />
                      </FormControl>
                      <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        {t("general.dark")}
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />

          <Button disabled={!form.formState.isDirty} type="submit">
            {t("settings.upd_pref")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default withSettingsLayout(Appearance);
