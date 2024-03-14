import { Typography } from "@/shared/components/Typography/Typography";
import { Card, CardContent, CardHeader } from "@components/card";
import { FC, memo } from "react";
import { cn, useAppDispatch } from "@/shared/lib/utils";
import styles from "./InstrumentCard.module.css";
import { StarIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { RoutePath } from "@/app/providers/Router";
import {
  Instrument,
  favoriteInstrument,
  instrumentActions,
  selectIsFavoritedInstrument,
  unfavoriteInstrument,
} from "../..";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";
import { useTranslation } from "react-i18next";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  instrument: Instrument;
}

const InstrumentCard: FC<Props> = ({ instrument, className, ...props }) => {
  const { t } = useTranslation();
  const classes = cn(styles.card, className);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorited = useSelector((state: StateSchema) =>
    selectIsFavoritedInstrument(state, instrument.id)
  );

  if (!instrument) return null;

  const handleClick = () => {
    navigate(RoutePath.instrument.replace(":id", instrument.id));
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isFavorited) {
      dispatch(unfavoriteInstrument(instrument));
    } else {
      dispatch(favoriteInstrument(instrument));
    }
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
                  {instrument.name}
                </Typography>
              </div>
            </TooltipTrigger>
            <button className={styles.history} onClick={handleFavoriteClick}>
              {isFavorited ? (
                <StarIcon className="fill-current" size={16} />
              ) : (
                <StarIcon size={16} />
              )}
            </button>
          </div>
          <Link
            to={RoutePath.instruments + "?segment=" + instrument.instrumentType}
            className={styles.link}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                instrumentActions.setFilter({
                  key: "types",
                  value: [instrument.instrumentType],
                })
              );
            }}
          >
            {t(`categories.${instrument.instrumentType}`)}
          </Link>
        </CardHeader>
        <CardContent>
          <p className={styles.content}>{instrument.description}</p>
        </CardContent>
      </Card>
      <TooltipContent>
        <div className="text-sm font-normal">{instrument.name}</div>
      </TooltipContent>
    </Tooltip>
  );
};

export default memo(InstrumentCard);
