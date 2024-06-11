import { useEffect, useState } from "react";
const values = [
  "AI is processing your request...",
  "Content is being generated...",
  "AI is thinking. Please wait...",
  "Almost there...",
  "Generating content...",
];
export const GenerateOverlay = () => {
  const [text, setText] = useState<string[]>([values[0]]);
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * values.length);
      setText([values[random]]);
    }, 2500);
    return () => clearInterval(interval);
  });

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent w-full max-w-[520px] px-10 py-40">
      <div className="flex flex-col items-center justify-center space-x-2">
        <img
          src="/logo-small.svg"
          alt="Loading..."
          className="rounded-md h-14 w-14 animate-spin mb-3"
          role="status"
        />
        <div className="text-xl text-white">{text}</div>
      </div>
    </div>
  );
};
