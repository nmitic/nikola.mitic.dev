"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Switch } from "../CvSwitch";
import { ChatHistory } from "./components/ChatHistory";
import { Intro } from "./components/ChatIntro";
import { ChatForm } from "./components/ChatForm";
import { useChat } from "./InterviewerAI.hooks";
import { useChatHistoryPdf } from "../components.hooks";

const autoInterviewQuestions = [
  "What is your current job?",
  "And what are your responsibilities in the current work?",
  "What are the project you are working on currently?",
  "What is the team size and roles in your current job?",
  "What technologies are you using for the current role?",
  "Are you using scrum or agile at the current company?",
];

export const useChatForm = (
  streamedAnswer: string,
  ask: (question: string) => void
) => {
  const [question, setQuestion] = useState("");
  const submitButtonDisabled = !!streamedAnswer || !question;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuestion("");
    await ask(question);
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  return {
    question,
    setQuestion,
    submitButtonDisabled,
    handleSubmit,
    handleQuestionChange,
  };
};

export const InterviewerAI = () => {
  const [autoInterviewOn, setAutoInterviewOn] = useState(false);
  const { streamedAnswer, chatHistory, ask, answeringInProgress, clearChat } =
    useChat();
  const { question, handleSubmit, handleQuestionChange, submitButtonDisabled } =
    useChatForm(streamedAnswer, ask);
  const { openPdfInNewTab } = useChatHistoryPdf(chatHistory);

  const introShown = !autoInterviewOn && !chatHistory.length;

  const handleSwitch = (switched: boolean) => {
    setAutoInterviewOn(!switched);
    clearChat();
  };

  useEffect(() => {
    const allQuestionAsked =
      chatHistory.length >= autoInterviewQuestions.length;
    const shouldKeepAsking =
      !answeringInProgress && autoInterviewOn && !allQuestionAsked;

    if (shouldKeepAsking) {
      const question = autoInterviewQuestions[chatHistory.length];

      ask(question);
    }

    if (allQuestionAsked) {
      setAutoInterviewOn(false);
    }
  }, [answeringInProgress, autoInterviewOn]);

  return (
    <>
      <div className=" flex gap-6">
        <Switch
          onSwitch={handleSwitch}
          switched={autoInterviewOn}
          label="auto interview"
        />
        {chatHistory.length && !autoInterviewOn ? (
          <button
            onClick={() => openPdfInNewTab()}
            className=" hover:underline"
          >
            Download conversation in PDF
          </button>
        ) : null}
      </div>
      {introShown && (
        <div className="lg:w-[60%] mx-auto">
          <Intro />
        </div>
      )}
      <div className="h-[70vh] overflow-y-scroll flex flex-col-reverse w-full lg:w-[60%] mx-auto">
        <ChatHistory history={chatHistory} streamedAnswer={streamedAnswer} />
      </div>
      <div className="mt-auto w-full lg:w-[60%] mx-auto">
        <ChatForm
          question={question}
          onSubmit={handleSubmit}
          onChange={handleQuestionChange}
          disabled={submitButtonDisabled}
        />
      </div>
    </>
  );
};
