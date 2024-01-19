import { BotIcon } from "lucide-react";

export const ChatMessage = () => {
  return (
    <div className="grid lg:grid-cols-12 gap-4 items-start">
      <div className="col-span-1 flex justify-center items-center pt-2">
        <div className="bg-primary p-2 text-white w-8 h-8">
          <BotIcon className="w-full h-full" />
        </div>
      </div>
      <div className="col-span-11 bg-accent rounded-xl p-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus ut ad
        eum in adipisci, possimus expedita eos quae rem. Voluptatibus ipsam
        quasi nihil quia assumenda culpa, nobis odit obcaecati nulla fuga quo
        libero natus, necessitatibus provident alias asperiores sint accusamus
        nisi tempora consequuntur commodi. Accusamus suscipit velit veritatis
        doloremque natus.
      </div>
    </div>
  );
};
