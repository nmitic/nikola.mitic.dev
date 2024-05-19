"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ChatHistory } from "./components/ChatHistory";
import { Intro } from "./components/ChatIntro";
import { ChatForm } from "./components/ChatForm";
import { useChat } from "./InterviewerAI.hooks";
import { useChatHistoryPdf } from "../components.hooks";
import { Button } from "../ui/Button";
import { Switch } from "../ui/Switch";

const autoInterviewQuestions = [
  "Are you looking for the new job?",
  "Which roles are you looking for in your next job?",
  "What is your current job?",
  "And what are your responsibilities in the current work?",
  "What are the project you are working on currently?",
  "What is the team size and roles in your current job?",
  "What technologies are you using for the current role?",
  "Are you using scrum or agile at the current company?",
  "What is your preferred way of working, home office, onsite or hybrid",
  "What is your notice period?",
  "What is your expected salary range for Berlin - Germany?",
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
    ask(question);
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const setQuestionSimulate = (question: string) => {
    return new Promise((resolve) => {
      const words = question.split(" ");
      let completedTimeouts = 0;

      words.forEach((item, index) => {
        setTimeout(() => {
          setQuestion((prev) => prev + " " + item);
          completedTimeouts++;

          if (completedTimeouts === words.length) {
            resolve(undefined); // Resolve the promise when the last timeout is done
          }
        }, 120 * index);
      });
    });
  };

  return {
    question,
    setQuestion,
    setQuestionSimulate,
    submitButtonDisabled,
    handleSubmit,
    handleQuestionChange,
  };
};

export const InterviewerAI = () => {
  const [autoInterviewOn, setAutoInterviewOn] = useState(false);
  const { streamedAnswer, chatHistory, ask, answeringInProgress } = useChat();
  const {
    question,
    handleSubmit,
    handleQuestionChange,
    submitButtonDisabled,
    setQuestionSimulate,
  } = useChatForm(streamedAnswer, ask);
  const { downloadPdf } = useChatHistoryPdf(chatHistory);

  const introShown = !autoInterviewOn && !chatHistory.length;

  const handleSwitch = (switched: boolean) => {
    setAutoInterviewOn(!switched);
  };

  useEffect(() => {
    const allQuestionAsked =
      chatHistory.length >= autoInterviewQuestions.length;
    const shouldKeepAsking =
      !answeringInProgress && autoInterviewOn && !allQuestionAsked;

    if (shouldKeepAsking) {
      const question = autoInterviewQuestions[chatHistory.length];
      setQuestionSimulate(question).then(() => {
        setTimeout(() => {
          if (document.chatFrom) {
            document.chatFrom.requestSubmit();
          }
        }, 100);
      });
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
          <Button onClick={() => downloadPdf()}>Save interview</Button>
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
