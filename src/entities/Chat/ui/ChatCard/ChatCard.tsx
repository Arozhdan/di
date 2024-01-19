import { Button } from "@/shared/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/shared/components/ui/card";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { ClockIcon, PenIcon, Trash2Icon } from "lucide-react";
import { memo } from "react";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
const ChatCard = () => {
  return (
    <Card className="group flex flex-col cursor-pointer hover:border-primary relative h-chat-card">
      <CardHeader className="pt-3 pb-1 pl-3 pr-0">
        <div className="w-full text-xs text-gray-500 flex items-center">
          <ClockIcon size={12} className="mr-1" />
          21.03.2021
        </div>
        <span className="line-clamp-2 text-xs h-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          dolorum!
        </span>
      </CardHeader>
      <CardFooter className="pb-1 px-3 flex items-center justify-between flex-col mt-auto">
        <div className="flex justify-between w-full space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="text" size="xs" className="px-0 text-gray-500">
                <PenIcon size={12} className="mr-1" />
                <span className="text-xs">Rename</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Rename chat</DialogTitle>
                <DialogDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur, dolorum!
                </DialogDescription>
              </DialogHeader>
              <div className="">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value="Pedro Duarte" className="" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="text">Cancel</Button>
                </DialogClose>{" "}
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" size="xs" className="px-0">
                <Trash2Icon size={12} className="mr-1" />
                <span className="text-xs">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  chat.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default memo(ChatCard);
