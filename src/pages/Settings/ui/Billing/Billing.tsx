import { RoutePath } from "@/app/providers/Router";
import { selectSubscription, unsubscribe } from "@/entities/Subscription";
import { selectUser } from "@/entities/User";
import { Typography } from "@/shared/components/Typography/Typography";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
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
import { cn, useAppDispatch } from "@/shared/lib/utils";
import { withSettingsLayout } from "@/widgets/SettingsLayout";
import { format } from "date-fns";
import { AlertOctagonIcon, Undo2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Billing = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const subscription = useSelector(selectSubscription);
  const subAllowance =
    subscription?.tier?.allowance === -1
      ? t("settings.unlimited")
      : subscription?.tier?.allowance || 0;

  const persentage =
    typeof subAllowance === "string"
      ? 0
      : Math.ceil((user?.monthlyQueries || 0) / subAllowance);

  const handleCancelSubscription = () => {
    dispatch(unsubscribe());
  };
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
            <TabsTrigger value="history" disabled>
              {t("settings.payment_history")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="subscription" className="pt-4">
            <Card className="max-w-4xl">
              <CardHeader className="border-b py-3">
                <CardTitle>
                  <Typography variant="sectionSubtitle" as="span">
                    {subscription?.tier.name || "Free trial"}
                  </Typography>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-6">
                <div className="grid md:grid-cols-2 text-sm gap-4 max-w-2xl">
                  <div className="space-x-1 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.current_plan")}:
                    </span>
                    <span className="block text-primary">
                      {subscription?.tier.name || "Free trial"}
                    </span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.monthly_cost")}:
                    </span>
                    <span className="block text-primary">
                      {subscription?.price || 0}
                    </span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.start_date")}:
                    </span>
                    <span className="block text-primary">
                      {format(
                        subscription?.startDate || new Date(),
                        "MM/dd/yyyy"
                      )}
                    </span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.end_date")}:
                    </span>
                    <span className="block text-primary">
                      {format(
                        subscription?.endDate || new Date(),
                        "MM/dd/yyyy"
                      )}
                    </span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.status")}:
                    </span>
                    <span className="block text-primary">
                      {subscription?.active
                        ? t("settings.active")
                        : t("settings.inactive")}
                    </span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.next_payment")}:
                    </span>
                    <span className="block text-primary">
                      {subscription?.nextPaymentDate ? (
                        format(subscription?.nextPaymentDate, "MM/dd/yyyy")
                      ) : (
                        <span className="text-red-500">-</span>
                      )}
                    </span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("settings.allowance")}:
                    </span>
                    <span className="block text-primary">
                      {subAllowance}
                      {t("settings.tokens_per_month")}
                    </span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">
                      {t("general.my_usage")}:
                    </span>
                    <span className="block text-primary">
                      {user?.monthlyQueries || 0} {t("settings.tokens")} {""}
                      <small>({persentage}%)</small>
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t py-3">
                <div className="md:flex md:space-x-2 w-full">
                  {!subscription || subscription?.freeTrial ? (
                    <Link
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "w-full md:w-auto"
                      )}
                      to={RoutePath.subscriptions_settings}
                    >
                      {t("settings.change_plan")}
                    </Link>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger>
                        {t("settings.cancel_plan")}
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>
                          {t("settings.cancel_plan")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("settings.cancel_plan_description")}
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            <Undo2Icon className="w-4 h-4 mr-2" />
                            {t("general.back")}
                          </AlertDialogCancel>
                          <AlertDialogCancel asChild>
                            <>
                              <Button
                                variant="destructive"
                                onClick={handleCancelSubscription}
                              >
                                <AlertOctagonIcon className="w-4 h-4 mr-2" />
                                {t("settings.cancel_plan")}
                              </Button>
                            </>
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
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
