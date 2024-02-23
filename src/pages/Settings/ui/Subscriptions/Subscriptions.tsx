import { slateToHtml } from "@slate-serializers/html";
import { selectSubscriptionLinks } from "@/entities/SiteSettings";
import { Typography } from "@/shared/components/Typography/Typography";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { withSettingsLayout } from "@/widgets/SettingsLayout";
import { StarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "@/entities/User";

const Subscriptions = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const subsciptions = useSelector(selectSubscriptionLinks);
  if (!user) return null;

  const getUrl = (url: string) => {
    return url
      .replace("{customerEmail}", user.email)
      .replace("{subscribtionStartDate}", new Date().toISOString());
  };

  return (
    <div className="container px-0">
      <Typography variant="sectionSubtitle">
        {t("general.subscriptions")}
      </Typography>
      <Typography className="text-gray-500 border-b pb-4">
        {t("settings.subs_desc")}
      </Typography>
      <div className="mt-6 space-y-4 xl:space-y-0 xl:grid grid-cols-3 gap-4">
        {subsciptions.map((item) => (
          <Card
            className={cn("hover:border-primary", {
              "border-primary": item.isFeatured,
            })}
            key={item.id}
          >
            <CardHeader className="border-b py-3">
              <CardTitle className="flex items-center space-x-2">
                {item.isFeatured && (
                  <StarIcon size={15} className="text-primary" />
                )}
                <Typography variant="sectionSubtitle" as="span">
                  Basic plan{" "}
                  {item.isFeatured && (
                    <span className="text-primary text-xs">
                      - {t("settings.recommended")}
                    </span>
                  )}
                </Typography>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <div className="grid grid-cols-2 text-sm gap-4 max-w-4xl">
                <div className="space-x-1 flex items-center">
                  <span className="block font-semibold">
                    {t("general.subscription")}: :
                  </span>
                  <span className="block text-primary">{item.tier.name}</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <span className="block font-semibold">
                    {t("settings.monthly_cost")}:
                  </span>
                  <span className="block text-primary">
                    {item.price} {item.currency}
                  </span>
                </div>
                <div className="space-x-2 flex items-center">
                  <span className="block font-semibold">
                    {t("settings.allowance")}:{" "}
                  </span>
                  <span className="block text-primary">
                    {item.tier.allowance === -1
                      ? t("settings.unlimited")
                      : item.tier.allowance}{" "}
                    {t("settings.tokens")}
                  </span>
                </div>
              </div>
              <div>
                <Typography variant="sectionSubtitle" className="mt-4">
                  {t("settings.features")}:
                </Typography>
                <div
                  className="mt-2 list-disc prose prose-sm"
                  dangerouslySetInnerHTML={
                    { __html: slateToHtml(item.description) } as any
                  }
                ></div>
              </div>
            </CardContent>
            <CardFooter className="border-t py-3 justify-end">
              <a href={getUrl(item.url)}>
                <Button
                  className="w-full md:w-auto"
                  variant={item.isFeatured ? "default" : "outline"}
                >
                  {t("settings.subscribe")}
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default withSettingsLayout(Subscriptions);
