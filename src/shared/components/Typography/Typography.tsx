import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import styles from "./Typography.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  variant?:
    | "pageTitle"
    | "sectionTitle"
    | "sectionSubtitle"
    | "body"
    | "bodyBold"
    | "small"
    | "smallBold";
}

const getComponent = (variant: Props["variant"], as: Props["as"]) => {
  if (as) return as;
  switch (variant) {
    case "pageTitle":
      return "h1";
    case "sectionTitle":
      return "h2";
    case "sectionSubtitle":
      return "h3";
    case "body":
    case "bodyBold":
    case "small":
    case "smallBold":
    default:
      return "p";
  }
};

export const Typography: FC<Props> = ({
  children,
  as,
  variant = "body",
  className,
  ...props
}) => {
  const Component = getComponent(variant, as);
  const classses = cn(styles.typography, styles[variant], className);

  return (
    <Component className={classses} {...props}>
      {children}
    </Component>
  );
};
