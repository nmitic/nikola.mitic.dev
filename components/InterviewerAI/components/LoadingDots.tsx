export const LoadingDots = () => {
  return (
    <div className=" inline-flex items-center justify-center space-x-2">
      <div className=" h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-white"></div>
    </div>
  );
};
