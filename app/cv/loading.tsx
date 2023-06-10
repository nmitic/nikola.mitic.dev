import dynamic from "next/dynamic";

const LoadingIndicator = dynamic<{}>(
  () => import("../../components/loadingIndicator/LoadingIndicator"),
  { ssr: false }
);

const Loading = () => {
  return (
    <div>
      <LoadingIndicator />
    </div>
  );
};

export default Loading;
