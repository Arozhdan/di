import { Typography } from "@/shared/components/Typography/Typography";
import { Card, CardContent, CardHeader } from "@components/card";
import { FC, memo } from "react";
import { cn } from "@/shared/lib/utils";
import styles from "./InstrumentCard.module.css";
import { StarIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { RoutePath } from "@/app/providers/Router";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const InstrumentCard: FC<Props> = ({ className, ...props }) => {
  const classes = cn(styles.card, className);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/instruments/1");
  };

  return (
    <Tooltip delayDuration={0}>
      <Card
        className={classes}
        {...props}
        role="link"
        tabIndex={0}
        onClick={handleClick}
      >
        <CardHeader className={styles.header}>
          <div className={styles.headerContent}>
            <TooltipTrigger>
              <div className={styles.title}>
                <Typography variant="sectionSubtitle" as="h3">
                  5 идей для онлайн-бизнеса в 2024 году
                </Typography>
              </div>
            </TooltipTrigger>
            <button
              className={styles.history}
              onClick={(e) => e.stopPropagation()}
            >
              <StarIcon size={16} />
            </button>
          </div>
          <Link
            to={RoutePath.instruments + "?segment=1"}
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            Business
          </Link>
        </CardHeader>
        <CardContent className={styles.content}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
          voluptatibus facilis culpa aperiam laboriosam ipsa excepturi dicta
          nostrum totam ipsum! Iste praesentium tempore sint dolorem mollitia
          soluta a at velit.s
        </CardContent>
      </Card>
      <TooltipContent>
        <div className="text-sm font-normal">
          Переводчик из грубого в вежливый
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default memo(InstrumentCard);
