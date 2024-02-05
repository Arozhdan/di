import { Message } from "@/pages/Chat";
import { cn } from "@/shared/lib/utils";
import { BotIcon, CircleUserIcon } from "lucide-react";
import { FC } from "react";

interface Props {
  message: Message;
  loading?: boolean;
}

export const ChatMessage: FC<Props> = ({ message, loading }) => {
  return (
    <div
      className={cn("grid lg:grid-cols-12 gap-4 items-start", {
        "animate-pulse": loading,
      })}
    >
      <div className="col-span-1 flex justify-center items-center pt-2">
        <div
          className={cn("p-2 text-white w-8 h-8", {
            "bg-primary": message.role === "assistant",
            "bg-accent": message.role === "user",
          })}
        >
          {message.role === "assistant" ? (
            <BotIcon className="w-full h-full" />
          ) : (
            <CircleUserIcon className="w-full h-full" />
          )}
        </div>
      </div>
      <div className="col-span-11 bg-accent rounded-xl p-4">
        {message.content}
      </div>
    </div>
  );
};
