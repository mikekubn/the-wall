const LoadingSkeleton = () => {
  return (
    <section className="w-full flex flex-1 flex-col">
      <div className="animate-pulse space-y-4">
        <div className="flex flex-1 flex-row justify-center w-full h-[24px] mb-10">
          <div className="animate-pulse bg-gray_5 h-[24px] w-[300px] rounded-[12px]" />
        </div>
        <div className="w-full flex flex-row flex-wrap items-start md:items-center justify-center flex-1 gap-6 md:gap-y-10">
          <div className="animate-pulse relative h-[220px] w-[90%] md:w-[406px] md:h-[251px] rounded-[12px] bg-gray_5" />
          <div className="animate-pulse relative h-[220px] w-[90%] md:w-[406px] md:h-[251px] rounded-[12px] bg-gray_5" />
          <div className="animate-pulse relative h-[220px] w-[90%] md:w-[406px] md:h-[251px] rounded-[12px] bg-gray_5" />
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
