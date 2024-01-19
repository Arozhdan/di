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
import { Link } from "react-router-dom";

export const Billing = () => {
  return (
    <div className="container px-0">
      <Typography variant="sectionSubtitle">Billing</Typography>
      <Typography className="text-gray-500 border-b pb-4">
        Manage your billing and subscription settings .
      </Typography>
      <div className="mt-6">
        <Tabs defaultValue="subscription">
          <TabsList>
            <TabsTrigger value="subscription">My subscription</TabsTrigger>
            <TabsTrigger value="history">Payment history</TabsTrigger>
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
                    <span className="block font-semibold">Current plan:</span>
                    <span className="block text-primary">Free trial</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">Monthly price:</span>
                    <span className="block text-primary">$9.99</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">Start date:</span>
                    <span className="block text-primary">01/01/2021</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">End date:</span>
                    <span className="block text-primary">01/01/2022</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">Status:</span>
                    <span className="block text-primary">Active</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">Next payment:</span>
                    <span className="block text-primary">01/02/2022</span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">Allowance:</span>
                    <span className="block text-primary">
                      1000 tokens / month
                    </span>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <span className="block font-semibold">My usage:</span>
                    <span className="block text-primary">
                      131 tokens <small>(13%)</small>
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
                    Upgrade plan
                  </Link>

                  <Button
                    className="w-full md:w-auto"
                    variant="ghost"
                    size="sm"
                  >
                    Cancel subscription
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="pt-4">
            <Table className="max-w-4xl">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
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
