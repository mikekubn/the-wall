const Loading = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray_5 rounded w-3/4" />
      <div className="h-4 bg-gray_5 rounded" />
      <div className="h-4 bg-gray_5 rounded w-5/6" />
      <div className="h-4 bg-gray_5 rounded w-1/2" />
    </div>
  );
};

export default Loading;
