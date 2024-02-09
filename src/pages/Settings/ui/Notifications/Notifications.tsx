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
} from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";

const notificationsFormSchema = z.object({
  push: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<NotificationsFormValues> = {
  communication_emails: true,
  marketing_emails: true,
  social_emails: true,
  security_emails: true,
  push: true,
};

import { Typography } from "@/shared/components/Typography/Typography";
import { withSettingsLayout } from "@/widgets/SettingsLayout";
import { Switch } from "@/shared/components/ui/switch";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useTranslation } from "react-i18next";

export const Notifications = () => {
  const { t } = useTranslation();
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    console.log(data);
  }

  return (
    <div className="container px-0">
      <Typography variant="sectionSubtitle">
        {t("general.notifications")}
      </Typography>
      <Typography className="text-gray-500 border-b pb-4">
        {t("settings.notifications_subtitle")}
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="communication_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {t("settings.communication_emails")}
                      </FormLabel>
                      <FormDescription>
                        {t("settings.communication_emails_desc")}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketing_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {t("settings.marketing_emails")}
                      </FormLabel>
                      <FormDescription>
                        {t("settings.marketing_emails_desc")}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="security_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {t("settings.security_emails")}
                      </FormLabel>
                      <FormDescription>
                        {t("settings.security_emails_desc")}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="push"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t("settings.enable_push")}</FormLabel>
                  <FormDescription>{t("settings.push_desc")}</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div className="pt-6">
            <Button disabled={!form.formState.isDirty} type="submit">
              {t("settings.upd_settings")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default withSettingsLayout(Notifications);
