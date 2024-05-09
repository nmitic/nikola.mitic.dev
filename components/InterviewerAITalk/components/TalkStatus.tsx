import Microphone from "../../../public/microphone.svg";
import MicrophoneDisabled from "../../../public/microphone-disabled.svg";
import Voice from "../../../public/voice.svg";
import ThoughtBubble from "../../../public/thought-bubble.svg";

export enum TalkStatusEnum {
  notListening = "not-listening",
  listening = "listening",
  thinking = "thinking",
  talking = "talking",
}

export const getStatusIconAndMsg = (status: TalkStatusEnum) => {
  switch (status) {
    case TalkStatusEnum.notListening:
      return (
        <>
          <div className=" text-black">Click here to start talking</div>
          <MicrophoneDisabled className="h-12 w-12" />
        </>
      );
    case TalkStatusEnum.listening:
      return (
        <>
          <div className=" text-black">I am listening</div>

          <Microphone className="h-12 w-12" />
        </>
      );
    case TalkStatusEnum.thinking:
      return (
        <>
          <div className="text-black">I am thinking</div>
          <Voice className="h-12 w-12 " />
        </>
      );
    case TalkStatusEnum.talking:
      return (
        <>
          <div className=" text-black">I am talking</div>
          <ThoughtBubble className="h-12 w-12 " />
        </>
      );
    default:
      break;
  }
};

const getStatusColorClass = (status: TalkStatusEnum) => {
  switch (status) {
    case TalkStatusEnum.notListening:
      return "bg-white";
    case TalkStatusEnum.listening:
      return "bg-green-500";
    case TalkStatusEnum.thinking:
      return "bg-blue-500";
    case TalkStatusEnum.talking:
      return "bg-orange-500";
    default:
      break;
  }
};

export const TalkStatus = ({
  status,
  onClick,
}: {
  status: TalkStatusEnum;
  onClick: () => void;
}) => {
  return (
    <div
      className={`${getStatusColorClass(
        status
      )} cursor-pointer w-[120px] h-[120px] flex justify-center flex-col items-center text-center rounded-lg text-gree m-auto`}
      onClick={onClick}
    >
      {getStatusIconAndMsg(status)}
    </div>
  );
};
