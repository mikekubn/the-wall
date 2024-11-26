const Loading = () => {
  return (
    <section className="w-full flex flex-1 flex-col justify-center items-center gap-6 md:gap-y-10">
      <div className="animate-pulse relative drop-shadow-lg rounded-[12px] w-[90%] md:w-2/3 lg:w-3/5 h-[300px] md:h-[360px] mx-auto bg-gray_6" />
    </section>
  );
};

export default Loading;
