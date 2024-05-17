import { ChatItem } from "./ChatItem";
import { LoadingDots } from "./LoadingDots";

export type ChatHistory = {
  question: string;
  answer: string;
  loading: boolean;
  streaming: boolean;
  id: string;
  error?: boolean;
}[];

export const ChatHistory = ({
  history,
  streamedAnswer,
}: {
  history: ChatHistory;
  streamedAnswer: string;
}) => {
  return (
    <div>
      {history.map(({ answer, question, id, loading, streaming, error }) => {
        if (loading) {
          return (
            <div key="ChatItem-ai">
              <ChatItem key={id} answer={<LoadingDots />} question={question} />
            </div>
          );
        }
        if (streaming) {
          return (
            <ChatItem key={id} answer={streamedAnswer} question={question} />
          );
        }

        if (error) {
          return (
            <ChatItem
              key={id}
              answer={
                <span>
                  Oppps, something went wrong with my AI clone, feel free to
                  contact Niko directly{" "}
                  <a
                    href="mailto:nikola.mitic.dev@gmail.com"
                    className="mr-2 underline transition-opacity hover:opacity-70"
                  >
                    nikola.mitic.dev@gmail.com
                  </a>
                </span>
              }
              question={question}
            />
          );
        }
        return <ChatItem key={id} answer={answer} question={question} />;
      })}
    </div>
  );
};
