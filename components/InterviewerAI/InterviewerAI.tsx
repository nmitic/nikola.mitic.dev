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
  "Where do you currently work?",
  "And what are your responsibilities?",
  "What is the team size and roles job?",
  "What technologies are you using in your latest role?",
  "Are you using scrum or agile in your latest role?",
  "Are you looking for the new job?",
  "And why?",
  "Looking at your resume one can notice you have been changing jobs very often, why is that?",
  "What are you looking in your future employer and job position?",
  "Which roles are you looking for in your next job?",
  "What is your preferred way of working, home office, onsite or hybrid",
  "What is your notice period, and when you are going to be available for new job?",
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

  const shouldShowIntro = !autoInterviewOn && !chatHistory.length;
  const shouldShowPdfDownloadBtn =
    !answeringInProgress && chatHistory.length && !autoInterviewOn;

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
        {shouldShowPdfDownloadBtn ? (
          <Button onClick={() => downloadPdf()}>Save interview</Button>
        ) : null}
      </div>
      {shouldShowIntro && (
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
