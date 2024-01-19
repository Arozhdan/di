export const Loader = () => {
  return (
    <div
      className="rounded-md h-8 w-8 border-4 border-t-4 border-primary animate-spin absolute"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
