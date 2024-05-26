import InfoIcon from "../../public/information-icon.svg";
export const Alert = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" bg-white text-black inline-flex p-3 rounded-lg gap-3 items-center">
      <InfoIcon className=" w-6 h-6" />
      {children}
    </section>
  );
};
