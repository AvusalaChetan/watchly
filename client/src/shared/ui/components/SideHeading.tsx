const SideHeading = ({text}: {text: string}) => {
  return (
    <div className="  px-2 capitalize tracking-wider font-semibold text-2xl flex gap-2 flex-col ">
      {text}
      <hr className="w-full text-(--muted) "></hr>
    </div>
  );
};

export default SideHeading;
