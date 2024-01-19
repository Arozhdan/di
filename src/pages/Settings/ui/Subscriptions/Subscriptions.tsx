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

const Subscriptions = () => {
  return (
    <div className="container px-0">
      <Typography variant="sectionSubtitle">Subscriptions</Typography>
      <Typography className="text-gray-500 border-b pb-4">
        Select a plan that works best for you.
      </Typography>
      <div className="mt-6 space-y-4 xl:space-y-0 xl:grid grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <Card
            className={cn("hover:border-primary", {
              "border-primary": item === 2,
            })}
            key={item}
          >
            <CardHeader className="border-b py-3">
              <CardTitle className="flex items-center space-x-2">
                {item === 2 && <StarIcon size={15} className="text-primary" />}
                <Typography variant="sectionSubtitle" as="span">
                  Basic plan{" "}
                  {item === 2 && (
                    <span className="text-primary text-xs">- Recommended</span>
                  )}
                </Typography>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <div className="grid grid-cols-2 text-sm gap-4 max-w-4xl">
                <div className="space-x-1 flex items-center">
                  <span className="block font-semibold">Current plan:</span>
                  <span className="block text-primary">Basic</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <span className="block font-semibold">Monthly price:</span>
                  <span className="block text-primary">$19</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <span className="block font-semibold">Monthly price:</span>
                  <span className="block text-primary">$19</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <span className="block font-semibold">Monthly price:</span>
                  <span className="block text-primary">$19</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <span className="block font-semibold">Monthly price:</span>
                  <span className="block text-primary">$19</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <span className="block font-semibold">Monthly price:</span>
                  <span className="block text-primary">$19</span>
                </div>
              </div>
              <div>
                <Typography variant="sectionSubtitle" className="mt-4">
                  Features
                </Typography>
                <ul className="pl-5 mt-2 list-disc">
                  <li>Unlimited templates</li>
                  <li>Unlimited templates</li>
                  <li>Unlimited templates</li>
                  <li>Unlimited templates</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="border-t py-3 justify-end">
              <Button
                className="w-full md:w-auto"
                variant={item === 2 ? "default" : "outline"}
              >
                Subscribe now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default withSettingsLayout(Subscriptions);
