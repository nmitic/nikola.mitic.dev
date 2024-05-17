import { useState } from "react";
import { answerQuestionWithStream } from "./InterviewerAI.func";
import { v4 as uuidv4 } from "uuid";
import { ChatHistory } from "./components/ChatHistory";

export const useChat = () => {
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistory>([]);
  const [answeringInProgress, setAnsweringInProgress] = useState(false);

  const ask = async (question: string) => {
    // used as a global state to indicate that answering is being awaited and later being in progress
    setAnsweringInProgress(true);
    // Resets streamed answer as its value will only show to the user once stream flag is set to true
    setStreamedAnswer("");
    // Generate unique ID
    const chatItemId = uuidv4();
    // Indicates the user that request to fetch the answer is made
    setChatHistory((prev) => [
      ...prev,
      {
        question: question,
        answer: "",
        id: chatItemId,
        loading: true,
        streaming: false,
      },
    ]);

    await answerQuestionWithStream({
      question,
      onStreamStart() {
        // Indicates the user that loading is done and streaming of the answer is in progress
        setChatHistory((prev) =>
          prev.map((item) => {
            if (item.id === chatItemId) {
              return { ...item, loading: false, streaming: true };
            }
            return item;
          })
        );
      },
      onStream(chunk) {
        setStreamedAnswer((prevAnswer) => prevAnswer + chunk);
      },
      onStreamDone(answer) {
        // Indicates the user that streaming is done and shows full answer to the user
        setChatHistory((prev) =>
          prev.map((item) => {
            if (item.id === chatItemId) {
              return { ...item, answer, streaming: false };
            }
            return item;
          })
        );
      },
      onError() {
        // indicated to the user the error has happen
        setChatHistory((prev) =>
          prev.map((item) => {
            if (item.id === chatItemId) {
              return { ...item, loading: false, streaming: false, error: true };
            }
            return item;
          })
        );
      },
    });

    // global answering stop
    setAnsweringInProgress(false);
  };

  const clearChat = () => setChatHistory([]);

  return {
    streamedAnswer,
    chatHistory,
    answeringInProgress,
    ask,
    clearChat,
  };
};
