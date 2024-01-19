import { Card, CardContent, CardHeader } from "@components/card";
import { FC, memo } from "react";
import { cn } from "@/shared/lib/utils";
import styles from "./HistoryCard.module.css";
import { Skeleton } from "@components/skeleton";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HistoryCardSkeleton: FC<Props> = ({ className, ...props }) => {
  const classes = cn(styles.card, className);

  return (
    <Card
      className={classes}
      {...props}
      role="link"
      tabIndex={0}
      onClick={() => {}}
    >
      <CardHeader className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.title}>
            <Skeleton className="h-8" />
            <Skeleton className="h-4 w-20 mt-2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className={styles.content}>
        <Skeleton className="h-20" />
      </CardContent>
    </Card>
  );
};

export default memo(HistoryCardSkeleton);
