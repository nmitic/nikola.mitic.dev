import Lottie from "lottie-react";
import speakingAnimation from "../../../public/lottie/speaking-lottie.json";
import recordingAnimation from "../../../public/lottie/recording-lottie.json";
import thinkingAnimation from "../../../public/lottie/thinking-lottie.json";
import callAnimation from "../../../public/lottie/call-lottie.json";

export enum TalkStatusEnum {
  notListening = "not-listening",
  listening = "listening",
  thinking = "thinking",
  talking = "talking",
}

export const getStatusAnimation = (status: TalkStatusEnum) => {
  switch (status) {
    case TalkStatusEnum.notListening:
      return <Lottie animationData={callAnimation} loop={true} />;
    case TalkStatusEnum.listening:
      return <Lottie animationData={recordingAnimation} loop={true} />;
    case TalkStatusEnum.thinking:
      return <Lottie animationData={thinkingAnimation} loop={true} />;
    case TalkStatusEnum.talking:
      return <Lottie animationData={speakingAnimation} loop={true} />;
    default:
      break;
  }
};

const StopBtn = ({ onStop }: { onStop: () => void }) => {
  return (
    <div
      className="bg-red-500 text-black rounded-3xl w-full p-3 mt-2"
      onClick={onStop}
    >
      Stop
    </div>
  );
};

export const TalkStatus = ({
  status,
  onStart,
  onStop,
}: {
  status: TalkStatusEnum;
  onStart: () => void;
  onStop: () => void;
}) => {
  return (
    <button className=" mx-auto group flex flex-col items-center">
      <div onClick={onStart} className=" bg-white rounded-3xl">
        <div className=" w-[120px] h-[120px] p-2">
          {getStatusAnimation(status)}
        </div>
      </div>
      {status !== TalkStatusEnum.notListening && <StopBtn onStop={onStop} />}
    </button>
  );
};
