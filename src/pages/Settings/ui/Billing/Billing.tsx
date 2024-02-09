import { RoutePath } from "@/app/providers/Router";
import { Typography } from "@/shared/components/Typography/Typography";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";
import { withSettingsLayout } from "@/widgets/SettingsLayout";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Billing = () => {
  const { t } = useTranslation();
  return (
    <div className="container px-0">
      <Typography variant="sectionSubtitle">{t("general.billing")}</Typography>
      <Typography className="text-gray-500 border-b pb-4">
        {t("settings.billing_subtitle")}
      </Typography>
      <div className="mt-6">
        <Tabs defaultValue="subscription">
          <TabsList>
            <TabsTrigger value="subscription">
              {t("settings.my_subscription")}
            </TabsTrigger>
            <TabsTrigger value="history">
              {t("settings.payment_history")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="subscription" className="pt-4">
            <Card className="max-w-4xl">
              <CardHeader className="border-b py-3">
                <CardTitle>
                  <Typography variant="sectionSubtitle" as="span">
                    Free trial subscription{" "}
                    <small className="text-gray-500 font-normal">
                      (trial ends in 7 days)
                    </small>
                  </Typography>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-6">
                <div className="grid md:grid-cols-2 text-sm gap-4 max-w-2xl">
                  <div className="space-x-1 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.current_plan")}:
                    </span>
                    <span className="block text-primary">Free trial</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.monthly_cost")}:
                    </span>
                    <span className="block text-primary">$9.99</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.start_date")}:
                    </span>
                    <span className="block text-primary">01/01/2021</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.end_date")}:
                    </span>
                    <span className="block text-primary">01/01/2022</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.status")}:
                    </span>
                    <span className="block text-primary">Active</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.next_payment")}:
                    </span>
                    <span className="block text-primary">01/02/2022</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.allowance")}:
                    </span>
                    <span className="block text-primary">
                      1000 {t("settings.tokens_per_month")}
                    </span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("general.my_usage")}:
                    </span>
                    <span className="block text-primary">
                      131 {t("settings.tokens")} {""}
                      <small>(13%)</small>
                    </span>
                  </div>
                </div>
                <p className="text-sm mt-6 max-w-2xl">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Autem, error ipsum nobis illo distinctio nostrum repudiandae
                  libero. Eaque iure, expedita ex molestias odio, id sint
                  tenetur eos dolores similique quam! You can find{" "}
                  <a href="#" className="underline font-semibold">
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline font-semibold">
                    terms of service
                  </a>{" "}
                  here.
                </p>
              </CardContent>
              <CardFooter className="border-t py-3">
                <div className="md:flex md:space-x-2 w-full">
                  <Link
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "w-full md:w-auto"
                    )}
                    to={RoutePath.subscriptions_settings}
                  >
                    {t("settings.change_plan")}
                  </Link>

                  <Button
                    className="w-full md:w-auto"
                    variant="ghost"
                    size="sm"
                  >
                    {t("settings.cancel_plan")}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="pt-4">
            <Table className="max-w-4xl">
              <TableCaption>
                {t("settings.list_of_recent_invoices")}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    {t("settings.invoice")}
                  </TableHead>
                  <TableHead>{t("settings.status")}</TableHead>
                  <TableHead>{t("settings.method")}</TableHead>
                  <TableHead className="text-right">
                    {t("settings.amount")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default withSettingsLayout(Billing);
