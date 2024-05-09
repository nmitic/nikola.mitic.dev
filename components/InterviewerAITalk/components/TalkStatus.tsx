export enum TalkStatusEnum {
  notListening = "not-listening",
  listening = "listening",
  thinking = "thinking",
  talking = "talking",
}

export const getStatusMSG = (status: TalkStatusEnum) => {
  switch (status) {
    case TalkStatusEnum.notListening:
      return "Click here to start talking";
    case TalkStatusEnum.listening:
      return "I am listening";
    case TalkStatusEnum.thinking:
      return "I am thinking, be patient";
    case TalkStatusEnum.talking:
      return "I am talking you better be listening";
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
    <div className=" cursor-pointer" onClick={onClick}>
      {getStatusMSG(status)}
    </div>
  );
};
