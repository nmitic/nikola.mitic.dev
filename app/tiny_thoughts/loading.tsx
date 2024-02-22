import dynamic from "next/dynamic";

const LoadingIndicator = dynamic<{}>(
  () => import("../../components/loadingIndicator/LoadingIndicator"),
  { ssr: false }
);

const Loading = () => {
  return (
    <div className="mb-auto mt-auto">
      <LoadingIndicator />
    </div>
  );
};

export default Loading;
