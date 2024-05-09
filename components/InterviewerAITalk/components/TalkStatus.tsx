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

const StatusIconMsg = ({
  icon: Icon,
  message,
  bgColorClassName,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  message: string;
  bgColorClassName: string;
}) => {
  return (
    <div
      className={`${bgColorClassName} w-[120px] h-[120px] gap-2 flex justify-between p-3 flex-col items-center text-center rounded-3xl text-gree`}
    >
      <div className=" text-black">{message}</div>
      <Icon className="h-12 w-12" />
    </div>
  );
};

export const getStatusIconAndMsg = (status: TalkStatusEnum) => {
  switch (status) {
    case TalkStatusEnum.notListening:
      return (
        <StatusIconMsg
          icon={MicrophoneDisabled}
          message="Start talking"
          bgColorClassName="bg-white"
        />
      );
    case TalkStatusEnum.listening:
      return (
        <StatusIconMsg
          icon={Microphone}
          message="Listening"
          bgColorClassName="bg-green-500"
        />
      );
    case TalkStatusEnum.thinking:
      return (
        <StatusIconMsg
          icon={Voice}
          message="Thinking"
          bgColorClassName="bg-blue-500"
        />
      );
    case TalkStatusEnum.talking:
      return (
        <StatusIconMsg
          icon={ThoughtBubble}
          message="Talking"
          bgColorClassName="bg-orange-500"
        />
      );
    default:
      break;
  }
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
    <button className=" mx-auto group">
      {status === TalkStatusEnum.notListening ? (
        <div onClick={onStart}>
          <div>{getStatusIconAndMsg(status)}</div>
        </div>
      ) : (
        <>
          <div>{getStatusIconAndMsg(status)}</div>
          <div
            className="bg-red-500 text-black rounded-3xl w-[120px] p-3 mt-2"
            onClick={onStop}
          >
            Stop
          </div>
        </>
      )}
    </button>
  );
};
