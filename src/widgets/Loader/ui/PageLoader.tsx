import { Loader } from "..";

export const PageLoader = () => {
  return (
    <div className="absolute h-screen w-screen z-50">
      <div className="relative h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    </div>
  );
};
