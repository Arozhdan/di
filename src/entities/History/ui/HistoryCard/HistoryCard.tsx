import { format } from "date-fns";
import { Typography } from "@/shared/components/Typography/Typography";
import { Card, CardContent, CardFooter, CardHeader } from "@components/card";
import { FC, memo, useRef, useState } from "react";
import { cn, useAppDispatch } from "@/shared/lib/utils";
import styles from "./HistoryCard.module.css";
import { CopyIcon, PinIcon, PinOffIcon, Trash2Icon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { RoutePath } from "@/app/providers/Router";
import { History, deleteHistory, pinHistory, unpinHistory } from "../..";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  expandable?: boolean;
  history: History;
}

const HistoryCard: FC<Props> = ({
  className,
  history,
  expandable = true,
  ...props
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const title = titleRef.current?.innerText;
    const content = contentRef.current?.innerText;
    navigator.clipboard.writeText(`${title}\n\n${content}`);
    toast(t("general.copied"), {
      description: t("popups.copy_text_success"),
      duration: 1000,
    });
  };

  const instrumentPath = RoutePath.instrument.replace(
    ":id",
    history.instrument.id.toString()
  );

  const handleClick = () => {
    navigate(RoutePath.query.replace(":id", history.id.toString()));
  };

  const handlePin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (history.isPinned) {
      dispatch(unpinHistory(history));
    } else {
      dispatch(pinHistory(history));
    }
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
                  <span ref={titleRef}>{history.input}</span>
                </Typography>
              </div>
            </TooltipTrigger>
            <div className={styles.actions}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className={styles.delete}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2Icon size={16} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t("history.delete_history")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("history.delete_history_description")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                      {t("general.cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteHistory(history.id));
                      }}
                    >
                      {t("chat.delete")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <button className={styles.history} onClick={handlePin}>
                {history.isPinned ? (
                  <PinOffIcon size={16} />
                ) : (
                  <PinIcon size={16} />
                )}
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
            {history.instrument.name}
          </Link>
          <span className="inline-block text-xs text-gray-500">
            {format(new Date(history.createdAt), "dd.MM.yyyy, HH:mm")}
          </span>
        </CardHeader>
        <CardContent className={cn(styles.content)}>
          <div
            ref={contentRef}
            className={cn({
              "cursor-text": isExpanded,
              "line-clamp-2": !isExpanded,
              "line-clamp-[30]": isExpanded,
            })}
            onClick={(e) => isExpanded && e.stopPropagation()}
            dangerouslySetInnerHTML={{
              __html: history.output.replace(/\n/g, "<br />"),
            }}
          />
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
              {isExpanded ? t("general.collapse") : t("general.expand")}
            </Button>

            <Button variant={"link"} onClick={handleClick} className="ml-auto">
              {t("general.edit")}
            </Button>
          </CardFooter>
        )}
      </Card>
      <TooltipContent>
        <div className="text-sm font-normal max-w-md">{history.input}</div>
      </TooltipContent>
    </Tooltip>
  );
};

export default memo(HistoryCard);
