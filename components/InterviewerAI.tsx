"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SendIcon from "../public/send.svg";
import profilePhoto from "../public/profile_photo.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import useAutoSizeTextArea from "../hooks/useAutoResizeTextArea";
import { v4 as uuidv4 } from "uuid";
import Avatar from "boring-avatars";
import { Switch } from "./CvSwitch";

const fakeAnswer = (delay: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate fetching data (replace this with your actual data or API call)
      const fakeData = "Fake data fetched successfully!";
      resolve(fakeData);
    }, delay);
  });
};

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

const autoInterviewQuestions = [
  "What is your current job?",
  "And what are your responsibilities in the current work?",
  "What are the project you are working on currently?",
  "What is the team size and roles in your current job?",
  "What technologies are you using for the current role?",
  "Are you using scrum or agile at the current company?",
];

const LoadingDots = () => {
  return (
    <div className=" inline-flex items-center justify-center space-x-2">
      <div className=" h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-white"></div>
    </div>
  );
};

type ChatHistory = {
  question: string;
  answer: string;
  loading: boolean;
  streaming: boolean;
  id: string;
  error?: boolean;
}[];

type ChatItem = {
  answer: React.ReactNode | string;
  question: string;
};

const ChatItem = ({ answer, question }: ChatItem) => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <div className="mr-4 inline-block w-[30px] align-middle">
          <Avatar
            size={35}
            name="Maya Angelou"
            variant="marble"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>

        <span className="font-bold">You</span>
        <p className="ml-14 mt-6">{question}</p>
      </div>
      <div>
        <Image
          className="mr-4 inline-block w-[35px] rounded-full"
          src={profilePhoto}
          alt="Nikola Mitic profile photo"
          placeholder="blur"
          priority
          width={35}
        />
        <span className="align-middle font-bold">Nikola Mitic</span>
        <p className="ml-14 mt-6">{answer}</p>
      </div>
    </div>
  );
};

export const InterviewerAI = () => {
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistory>([]);
  const [autoInterviewOn, setAutoInterviewOn] = useState(false);
  const [autoInterviewQuestionIndex, setAutoInterviewQuestionIndex] =
    useState(0);
  const [answeringInProgress, setAnsweringInProgress] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const submitButtonDisabled = !!streamedAnswer || !question;

  useAutoSizeTextArea(textAreaRef.current, question);

  const handleAutoQuestionSubmit = async () => {
    await autoQuestionSubmit(
      autoInterviewQuestions[autoInterviewQuestionIndex]
    );
    setAutoInterviewQuestionIndex((prev) => (prev += 1));
  };

  useEffect(() => {
    const noMoreQuestions =
      autoInterviewQuestionIndex > autoInterviewQuestions.length - 1;
    if (noMoreQuestions) {
      setAutoInterviewOn(false);
      setAutoInterviewQuestionIndex(0);
      return;
    }
    const shouldAutoSubmit =
      autoInterviewOn && !answeringInProgress && !noMoreQuestions;

    if (shouldAutoSubmit) {
      handleAutoQuestionSubmit();
    }
  }, [autoInterviewOn, answeringInProgress]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // used as a global state to indicate that answering is being awaited and later being in progress
    setAnsweringInProgress(true);
    // Clear form input value for question
    setQuestion("");
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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_INTERVIEWER_SERVICE}?question=${question}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Check if the Response object has a ReadableStream as its body
      if (!response.body || !response.body.getReader) {
        console.error("Streaming not supported in this environment.");
        return;
      }

      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();

      // Indicates the user that loading is done and streaming of the answer is in progress
      setChatHistory((prev) =>
        prev.map((item) => {
          if (item.id === chatItemId) {
            return { ...item, loading: false, streaming: true };
          }
          return item;
        })
      );

      // Keeps track of streamed answer and will evaluate to full once streaming is done
      let fullDecodedAnswer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("End of stream");

          break;
        }
        const decodedText = textDecoder.decode(value);

        console.log("Received chunk:", decodedText);
        fullDecodedAnswer = fullDecodedAnswer + decodedText;

        setStreamedAnswer((prevAnswer) => prevAnswer + decodedText);
      }
      // Indicates the user that streaming is done and shows full answer to the user
      setChatHistory((prev) =>
        prev.map((item) => {
          if (item.id === chatItemId) {
            return { ...item, answer: fullDecodedAnswer, streaming: false };
          }
          return item;
        })
      );
    } catch (error) {
      // indicated to the user the error has happen
      setChatHistory((prev) =>
        prev.map((item) => {
          if (item.id === chatItemId) {
            return { ...item, loading: false, streaming: false, error: true };
          }
          return item;
        })
      );
      console.error(error);
    }
    // global answering stop
    setAnsweringInProgress(false);
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // Update the state with the new text area value
    setQuestion(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the newline character from being added to the textarea

      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  const autoQuestionSubmit = async (question: string) => {
    if (formRef.current) {
      for (let char of question) {
        setQuestion((prev) => (prev += char));

        await delay(50);
      }

      await delay(500);

      formRef.current.requestSubmit();
    }
  };

  const handleSwitch = (switched: boolean) => {
    setAutoInterviewOn(!switched);
  };

  return (
    <AnimatePresence>
      <>
        <div className="">
          <Switch
            onSwitch={handleSwitch}
            switched={autoInterviewOn}
            label="auto interview"
          />
        </div>
        {!autoInterviewOn && !chatHistory.length && (
          <div className="lg:w-[60%] mx-auto">
            <h1 className="text-center mb-2 text-xl">
              Hi there 👋. I am Niko's AI clone. Ask anything!
            </h1>
            <p>
              I will answer based on Niko's resume and blog. If you are out of
              ideas what to ask, you can enable auto interview and pre defined
              set of question will be asked.
              <span className="font-bold"> Please note:</span> It might take me
              same time to answer your first question, so please give me some
              time. Thanks!
            </p>
          </div>
        )}
        <div className="h-[70vh] overflow-y-scroll flex flex-col-reverse lg:w-[60%] mx-auto">
          <div>
            {chatHistory.map(
              ({ answer, question, id, loading, streaming, error }) => {
                if (loading) {
                  return (
                    <motion.div
                      key="ChatItem-ai"
                      initial={{ opacity: 0, scale: 1.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                    >
                      <ChatItem
                        key={id}
                        answer={<LoadingDots />}
                        question={question}
                      />
                    </motion.div>
                  );
                }
                if (streaming) {
                  return (
                    <ChatItem
                      key={id}
                      answer={streamedAnswer}
                      question={question}
                    />
                  );
                }

                if (error) {
                  return (
                    <ChatItem
                      key={id}
                      answer={
                        <span>
                          Oppps, something went wrong with my AI clone, feel
                          free to contact Niko directly{" "}
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
                return (
                  <ChatItem key={id} answer={answer} question={question} />
                );
              }
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="mt-auto w-full lg:w-[60%] mx-auto"
        >
          <div className="flex px-4">
            <textarea
              rows={1}
              ref={textAreaRef}
              className="resize-none border-2 bg-black pb-2 pl-2 pr-8 pt-2 text-white rounded-xl w-full"
              name="query"
              value={question}
              onChange={handleQuestionChange}
              required
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              disabled={submitButtonDisabled}
              className="disabled:opacity-40 -ml-8 z-10"
            >
              <SendIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </form>
      </>
    </AnimatePresence>
  );
};
