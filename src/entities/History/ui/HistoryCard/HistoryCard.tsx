import { Typography } from "@/shared/components/Typography/Typography";
import { Card, CardContent, CardFooter, CardHeader } from "@components/card";
import { FC, memo, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import styles from "./HistoryCard.module.css";
import { CopyIcon, PinIcon, Trash2Icon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { RoutePath } from "@/app/providers/Router";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  expandable?: boolean;
}

const HistoryCard: FC<Props> = ({ className, expandable = true, ...props }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const title = titleRef.current?.innerText;
    const content = contentRef.current?.innerText;
    navigator.clipboard.writeText(`${title}\n\n${content}`);
    toast("Скопировано!", {
      description: "Текст скопирован в буфер обмена",
      duration: 1000,
    });
  };

  const instrumentPath = RoutePath.instrument.replace(":id", "1");

  const handleClick = () => {
    navigate(RoutePath.query.replace(":id", "1"));
  };

  const classes = cn(styles.card, className, {
    [styles.expanded]: isExpanded,
  });

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
                  <span ref={titleRef}>
                    5 идей для онлайн-бизнеса в 2024 году
                  </span>
                </Typography>
              </div>
            </TooltipTrigger>
            <div className={styles.actions}>
              <button className={styles.delete} onClick={() => {}}>
                <Trash2Icon size={16} />
              </button>
              <button className={styles.history} onClick={() => {}}>
                <PinIcon size={16} />
              </button>
              <button className={styles.copy} onClick={handleCopy}>
                <CopyIcon size={16} />
              </button>
            </div>
          </div>
          <Link
            to={instrumentPath}
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            5 идей для онлайн-бизнеса в 2024 году
          </Link>
        </CardHeader>
        <CardContent
          className={cn(styles.content, {
            "line-clamp-3": !isExpanded,
          })}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                ref={contentRef}
                className={cn({
                  "cursor-text": isExpanded,
                })}
                onClick={(e) => isExpanded && e.stopPropagation()}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officia voluptatibus facilis culpa aperiam laboriosam ipsa
                excepturi dicta nostrum totam ipsum! Iste praesentium tempore
                excepturi dicta nostrum totam ipsum! Iste praesentium tempore
                excepturi dicta nostrum totam ipsum! Iste praesentium tempore
                sint dolorem mollitia soluta a at velit.s
              </div>
            </TooltipTrigger>
            <TooltipContent
              className="max-w-lg cursor-text"
              onClick={(e) => e.stopPropagation()}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
              voluptatibus facilis culpa aperiam laboriosam ipsa excepturi dicta
              nostrum totam ipsum! Iste praesentium tempore sint dolorem
              mollitia soluta a at velit.s
            </TooltipContent>
          </Tooltip>
        </CardContent>
        {expandable && (
          <CardFooter className={styles.footer}>
            <Button
              variant={"link"}
              className={styles.expand}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded((prev) => !prev);
              }}
            >
              {isExpanded ? "Свернуть" : "Развернуть"}
            </Button>
            <span className="inline-block ml-auto text-xs text-gray-500">
              21.09.2021
            </span>
          </CardFooter>
        )}
      </Card>
      <TooltipContent>
        <div className="text-sm font-normal">
          Переводчик из грубого в вежливый
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default memo(HistoryCard);
