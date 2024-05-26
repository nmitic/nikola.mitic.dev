"use client";

import { useEffect, useState } from "react";
import { Drawer } from "./Drawer";
import { useChat } from "./InterviewerAI/InterviewerAI.hooks";
import { ChatHistory } from "./InterviewerAI/components/ChatHistory";
import { ChatForm } from "./InterviewerAI/components/ChatForm";
import { useChatForm } from "./InterviewerAI/InterviewerAI";
import { useChatHistoryPdf } from "./components.hooks";
import { Button } from "./ui/Button";

export const DrawerAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { streamedAnswer, chatHistory, ask, clearChat, answeringInProgress } =
    useChat();
  const { question, handleSubmit, handleQuestionChange, submitButtonDisabled } =
    useChatForm(streamedAnswer, ask);
  const askQuestion = async () => {
    await ask(
      "Hi Nikola, what a nice CV you have! Can you please summarize all your positions and responsibilities so far? I want to know how many years you spend in each position, location, your role, tech stack, team size and projects you worked on."
    );
  };
  const { downloadPdf } = useChatHistoryPdf(chatHistory);

  const handlePdfDownload = () => {
    downloadPdf();
  };

  useEffect(() => {
    if (isOpen) {
      askQuestion();
    } else {
      clearChat();
    }
  }, [isOpen]);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ask AI to summarize!</Button>
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Nikola Mitic AI clone - interview"
      >
        <div className=" flex flex-col-reverse h-full overflow-y-scroll">
          <div className=" pb-32">
            <ChatHistory
              history={chatHistory}
              streamedAnswer={streamedAnswer}
            />

            {!answeringInProgress && (
              <Button onClick={handlePdfDownload}>Save interview</Button>
            )}
          </div>
          <div className=" fixed bottom-6 left-0 right-0">
            <ChatForm
              question={question}
              onSubmit={handleSubmit}
              onChange={handleQuestionChange}
              disabled={submitButtonDisabled}
              autoFocus={false}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};
