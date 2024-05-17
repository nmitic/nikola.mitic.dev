export const AudioAnswer = ({
  question,
  onAnswerDone,
  onAnswerStart,
}: {
  question: string;
  onAnswerDone: () => void;
  onAnswerStart: () => void;
}) => {
  const demo = process.env.NEXT_PUBLIC_AI_DEMO === "true";

  return (
    <audio autoPlay onPlay={onAnswerStart} onEnded={onAnswerDone}>
      <source
        src={`${process.env.NEXT_PUBLIC_AI_INTERVIEWER_SERVICE}/api/talk?question=${question}&demo=${demo}`}
        type="audio/mp3"
      />
    </audio>
  );
};
