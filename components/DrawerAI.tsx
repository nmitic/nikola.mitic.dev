"use client";

import { useEffect, useState } from "react";
import { Drawer } from "./Drawer";
import { useChat } from "./InterviewerAI/InterviewerAI.hooks";
import { ChatHistory } from "./InterviewerAI/components/ChatHistory";
import { ChatForm } from "./InterviewerAI/components/ChatForm";
import { useChatForm } from "./InterviewerAI/InterviewerAI";

export const DrawerAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { streamedAnswer, chatHistory, ask, clearChat } = useChat();
  const { question, handleSubmit, handleQuestionChange, submitButtonDisabled } =
    useChatForm(streamedAnswer, ask);
  const askQuestion = async () => {
    await ask(
      "Hi Nikola, what a nice CV you have! Can you please summarize all your positions and responsibilities so far? I want to know how many years you spend in each position, location, your role, tech stack, team size and projects you worked on."
    );
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
      <button
        onClick={() => setIsOpen(true)}
        className="print:hidden bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow self-start inline-block"
      >
        Ask AI to summarize!
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className=" flex flex-col-reverse h-full overflow-y-scroll">
          <div className=" pb-20">
            <ChatHistory
              history={chatHistory}
              streamedAnswer={streamedAnswer}
            />
          </div>
          <div className=" fixed bottom-6 left-0 right-0">
            <ChatForm
              question={question}
              onSubmit={handleSubmit}
              onChange={handleQuestionChange}
              disabled={submitButtonDisabled}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};
