import { Input } from "@/shared/components/ui/input";
import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/shared/components/ui/button";
import { CopyPlusIcon } from "lucide-react";
import { RoutePath } from "@/app/providers/Router";
import { useTranslation } from "react-i18next";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export const TemplatesFilters: FC<Props> = ({ className, ...props }) => {
  const { t } = useTranslation();
  const classes = cn(
    "flex flex-wrap py-4 border-b border-t border-gray-100",
    className
  );
  return (
    <div className={classes} {...props}>
      <Input
        placeholder={t("general.search")}
        className="h-8 w-full md:w-[150px] lg:w-[200px] xl:w-[340px] mb-3 md:mb-0"
      />
      <Link
        to={RoutePath.create_template}
        className={cn(
          buttonVariants({
            size: "sm",
            className: "md:ml-4 h-8 w-full md:w-auto",
          })
        )}
      >
        <CopyPlusIcon size={14} className="mr-2" />
        {t("templates.new_template")}
      </Link>
    </div>
  );
};
