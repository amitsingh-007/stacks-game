import clsx from "clsx";

const Dot = ({ isOn }: { isOn: boolean }) => {
  return (
    <div
      className={clsx(
        "rounded-full w-[16px] h-[16px] md:w-[20px] md:h-[20px]",
        {
          "bg-[#ff7189] shadow-[0_0_14px_#ff0831,0_0_14px_#ff0831]": isOn,
          "bg-[#a63b594d]": !isOn,
        }
      )}
    />
  );
};

export default Dot;
